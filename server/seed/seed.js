import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import mongoose from 'mongoose';
import Admin from '../models/Admin.js';
import Product from '../models/Product.js';
import Service from '../models/Service.js';
import Gallery from '../models/Gallery.js';
import BusinessSettings from '../models/BusinessSettings.js';
import Enquiry from '../models/Enquiry.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '../.env') });

const seedDatabase = async () => {
  try {
    const mongoUri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/global_fire_db';
    console.log('[Seed] Connecting to MongoDB:', mongoUri);
    await mongoose.connect(mongoUri);
    console.log('[Seed] Connected to MongoDB');

    // Clean existing collections
    await Admin.deleteMany({});
    await Product.deleteMany({});
    await Service.deleteMany({});
    await Gallery.deleteMany({});
    await BusinessSettings.deleteMany({});
    console.log('[Seed] Cleaned existing collections');

    // 1. Create Default Admin
    const defaultAdmin = await Admin.create({
      name: 'Global Fire Administrator',
      email: 'admin@globalfire.com',
      password: 'Admin@12345',
      role: 'superadmin',
    });
    console.log(`[Seed] Created default admin: ${defaultAdmin.email} (Password: Admin@12345)`);

    // 2. Create Products (strictly truthful, legal-safe, no unverified claims)
    const initialProducts = [
      {
        name: 'CO₂ Fire Extinguishers',
        slug: 'co2-fire-extinguishers',
        category: 'Fire Extinguishers',
        description:
          'CO₂ fire extinguishers are available for suitable applications. Contact us to discuss the appropriate equipment for your needs.',
        image: '/assets/products/co2-extinguisher.svg',
        features: [
          'Suitable for electrical hazard areas',
          'Clean agent leaving no residue',
          'Durable discharge horn and cylinder',
          'Multiple capacity options available',
        ],
        active: true,
      },
      {
        name: 'ABC Dry Chemical Powder Fire Extinguishers',
        slug: 'abc-dry-chemical-powder-fire-extinguishers',
        category: 'Fire Extinguishers',
        description:
          'ABC dry chemical powder fire extinguishers for suitable fire protection applications.',
        image: '/assets/products/abc-powder-extinguisher.svg',
        features: [
          'Multipurpose fire extinguishing agent',
          'Easy-to-read pressure gauge',
          'Robust safety pin and squeeze mechanism',
          'Suitable for commercial and industrial spaces',
        ],
        active: true,
      },
      {
        name: 'Water Type Fire Extinguishers',
        slug: 'water-type-fire-extinguishers',
        category: 'Fire Extinguishers',
        description:
          'Water-based fire extinguishing equipment for suitable applications.',
        image: '/assets/products/water-extinguisher.svg',
        features: [
          'Effective cooling action for combustible materials',
          'Corrosion-resistant internal lining',
          'Simple operation nozzle and trigger',
          'Contact us for capacity and sizing guidance',
        ],
        active: true,
      },
      {
        name: 'Foam Type Fire Extinguishers',
        slug: 'foam-type-fire-extinguishers',
        category: 'Fire Extinguishers',
        description:
          'Foam fire extinguishing equipment for suitable applications.',
        image: '/assets/products/foam-extinguisher.svg',
        features: [
          'Forms a blanketing film over liquid surfaces',
          'Dual cooling and smothering effect',
          'Standard safety pin and valve assembly',
          'Suitable for workshops, garages, and storage areas',
        ],
        active: true,
      },
      {
        name: 'Fire Hydrant Systems',
        slug: 'fire-hydrant-systems',
        category: 'Fire Hydrant Systems',
        description:
          'Fire hydrant system equipment and related services. Contact us for requirements and installation/service discussion.',
        image: '/assets/products/fire-hydrant.svg',
        features: [
          'Hydrant landing valves and coupling accessories',
          'Reinforced delivery fire hoses & branch pipes',
          'Hydrant cabinet and hose reel integration',
          'Inspection, testing, and periodic servicing support',
        ],
        active: true,
      },
    ];

    await Product.insertMany(initialProducts);
    console.log(`[Seed] Inserted ${initialProducts.length} products`);

    // 3. Create Services
    const initialServices = [
      {
        name: 'Fire Extinguisher Supply',
        description:
          'Supply of new portable fire extinguishers including CO₂, ABC dry chemical powder, water, and foam types tailored to your building or facility requirements.',
        icon: 'Flame',
        order: 1,
        active: true,
      },
      {
        name: 'Fire Extinguisher Refilling',
        description:
          'Prompt and professional refilling services for discharged or due fire extinguishers using appropriate extinguishing agents and pressure checks.',
        icon: 'RefreshCw',
        order: 2,
        active: true,
      },
      {
        name: 'Fire Extinguisher Maintenance / Service',
        description:
          'Routine inspection, mechanical component check, pressure testing, valve servicing, and maintenance to ensure equipment readiness.',
        icon: 'Wrench',
        order: 3,
        active: true,
      },
      {
        name: 'Fire Hydrant System Services',
        description:
          'Comprehensive servicing, valve overhaul, hose testing, coupling checks, and maintenance support for commercial and industrial fire hydrant systems.',
        icon: 'ShieldCheck',
        order: 4,
        active: true,
      },
    ];

    await Service.insertMany(initialServices);
    console.log(`[Seed] Inserted ${initialServices.length} services`);

    // 4. Create Gallery Items
    const initialGallery = [
      {
        title: 'CO₂ Fire Extinguisher Unit',
        image: '/assets/products/co2-extinguisher.svg',
        category: 'Fire Extinguishers',
      },
      {
        title: 'ABC Dry Chemical Powder Unit',
        image: '/assets/products/abc-powder-extinguisher.svg',
        category: 'Fire Extinguishers',
      },
      {
        title: 'Water & Foam Extinguishers',
        image: '/assets/products/foam-extinguisher.svg',
        category: 'Fire Extinguishers',
      },
      {
        title: 'Fire Hydrant Landing Valve & Hose Reel',
        image: '/assets/products/fire-hydrant.svg',
        category: 'Fire Hydrant Equipment',
      },
      {
        title: 'Basic Extinguisher Operation Method (P.A.S.S.)',
        image: '/assets/gallery/operation-guide.svg',
        category: 'Fire Extinguisher Operation',
      },
      {
        title: 'Industrial Fire Hydrant Connection Setup',
        image: '/assets/gallery/hydrant-system.svg',
        category: 'Fire Protection Systems',
      },
    ];

    await Gallery.insertMany(initialGallery);
    console.log(`[Seed] Inserted ${initialGallery.length} gallery items`);

    // 5. Create Business Settings (No fake phone/whatsapp/email - editable by admin)
    const initialSettings = await BusinessSettings.create({
      companyName: 'GLOBAL FIRE PROTECTION EQUIPMENTS',
      address: 'Kadalaur Road, Kovilpatti, Tamil Nadu, India',
      city: 'Kovilpatti',
      state: 'Tamil Nadu',
      phone: '', // Business owner can add their actual phone
      whatsapp: '', // Business owner can add their actual WhatsApp
      email: '', // Business owner can add their actual email
      googleMapsUrl: 'https://maps.google.com/?q=Kadalaur+Road,+Kovilpatti,+Tamil+Nadu',
      workingHours: 'Monday - Saturday: 9:00 AM - 7:00 PM',
      description:
        'Global Fire Protection Equipments, located on Kadalaur Road, Kovilpatti, supplies fire extinguishers and provides fire extinguisher refilling and service-related solutions. The business also offers fire hydrant system services.',
      socialLinks: {
        facebook: '',
        instagram: '',
      },
      verifiedClaims: [],
    });
    console.log('[Seed] Created business settings');

    console.log('[Seed] Database seeding completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('[Seed Error]:', error);
    process.exit(1);
  }
};

seedDatabase();
