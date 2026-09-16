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

    // 2. Create Products (strictly truthful, legal-safe, only the 4 requested items with concise descriptions)
    const initialProducts = [
      {
        name: 'Fire Extinguishers',
        slug: 'fire-extinguishers',
        category: 'Fire Extinguishers',
        description:
          'Portable fire extinguishers available in Powder, Water, Foam, CO₂, and Wet Chemical types for complete fire safety.',
        image: '/assets/products/fire-extinguishers.jpg',
        features: ['Powder, Water, Foam, CO₂, and Wet Chemical types', 'Suitable for domestic, commercial & industrial use'],
        active: true,
      },
      {
        name: 'Fire Hose Box',
        slug: 'fire-hose-box',
        category: 'Fire Hydrant Systems',
        description:
          'Heavy-duty dual-door red cabinet designed to safely store delivery fire hoses and branch pipes.',
        image: '/assets/products/fire-hose-box.jpg',
        features: ['Double-door glass front design', 'Weatherproof and durable steel construction'],
        active: true,
      },
      {
        name: 'Fire Hose Reel',
        slug: 'fire-hose-reel',
        category: 'Fire Hydrant Systems',
        description:
          'Wall-mounted fire hose reel drum system for immediate water supply and emergency fire fighting.',
        image: '/assets/products/fire-hose-reel.jpg',
        features: ['High-flow rotary drum mechanism', 'Wall-mounted with quick-action valve'],
        active: true,
      },
      {
        name: 'Fire Extinguisher Operation Method Sign Board',
        slug: 'fire-extinguisher-operation-sign-board',
        category: 'Safety Signage',
        description:
          'Bilingual (English & Tamil) P.A.S.S. method step-by-step operating instruction sign board.',
        image: '/assets/products/fire-extinguisher-operation-sign.jpg',
        features: ['Bilingual Tamil & English instructions', 'Clear P.A.S.S. visual diagram'],
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
        title: 'Portable Fire Extinguishers Lineup',
        image: '/assets/products/fire-extinguishers.jpg',
        category: 'Fire Extinguishers',
      },
      {
        title: 'Double-Door Fire Hose Box',
        image: '/assets/products/fire-hose-box.jpg',
        category: 'Fire Hydrant Equipment',
      },
      {
        title: 'Wall-Mounted Fire Hose Reel Drum',
        image: '/assets/products/fire-hose-reel.jpg',
        category: 'Fire Hydrant Equipment',
      },
      {
        title: 'Fire Extinguisher Operation Method (P.A.S.S. Guide)',
        image: '/assets/products/fire-extinguisher-operation-sign.jpg',
        category: 'Fire Extinguisher Operation',
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
      phone: '+91 73389 62276',
      whatsapp: '7338962276',
      email: 'globalsafety89@gmail.com', // Configured business email
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
