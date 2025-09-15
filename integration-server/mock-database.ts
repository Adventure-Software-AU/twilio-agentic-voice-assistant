import { v4 as uuidV4 } from 'uuid';
import type {
  OrderRecord,
  ProductRecord,
  UserRecord,
} from '../shared/db-entities.js';

const {
  DEVELOPERS_EMAIL,
  DEVELOPERS_FIRST_NAME,
  DEVELOPERS_LAST_NAME,
  DEVELOPERS_PHONE_NUMBER,
} = process.env;

const demoUser: UserRecord = {
  ...makeBaseRecord(1000, 60),
  id: 'us-0001',

  first_name: DEVELOPERS_FIRST_NAME ?? 'Jake',
  last_name: DEVELOPERS_LAST_NAME ?? 'Carter',
  email: DEVELOPERS_EMAIL ?? 'jcarter@gmail.com',
  mobile_phone: DEVELOPERS_PHONE_NUMBER ?? '+12345550001',

  city: 'Sydney',
  state: 'NSW',
  zip: '2121',

  date_of_birth: getPastDateISO(40 * 365),

  payment_methods: [],
};

demoUser.payment_methods.push({
  ...makeBaseRecord(),
  id: uuidV4(),
  last_four: '0124',
  type: 'card',
  user_id: demoUser.id,
});

const users: UserRecord[] = [demoUser];

const products = [
  {
    ...makeBaseRecord(),
    id: makeId('pr'),
    name: 'iPhone Screen Repair',
    description: 'Professional screen repair service for all iPhone models.',
    unit_price: 499.99,
    attributes: {},
    category: 'Repair Services',
    tags: ['screen', 'iphone', 'repair'],
  },
  {
    ...makeBaseRecord(),
    id: makeId('pr'),
    name: 'iPhone Battery Replacement',
    description: 'Fast and reliable battery replacement for iPhones.',
    unit_price: 354.99,
    attributes: {},
    category: 'Repair Services',
    tags: ['battery', 'iphone', 'repair'],
  },
  {
    ...makeBaseRecord(),
    id: makeId('pr'),
    name: 'iPhone Water Damage Repair',
    description: 'Comprehensive water damage repair service for iPhones.',
    unit_price: 7012.14,
    attributes: {},
    category: 'Repair Services',
    tags: ['battery', 'iphone', 'repair', 'water'],
  },
  {
    ...makeBaseRecord(),
    id: makeId('pr'),
    name: 'iPhone Waterproof Case',
    description:
      'Durable waterproof case to protect your iPhone from water damage.',
    unit_price: 3054.99,
    attributes: {},
    category: 'Accessories',
    tags: ['case', 'iphone', 'waterproof', 'accessory'],
  },
  {
    ...makeBaseRecord(),
    id: makeId('pr'),
    name: 'General Repair Service',
    description: 'Comprehensive repair service for various phone issues.',
    unit_price: 85.5,
    attributes: {},
    category: 'Repair Services',
    tags: [
      'battery',
      'iphone',
      'repair',
      'screen',
      'samsung',
      'google',
      'charging',
    ],
  },
];

const productMap: Record<string, ProductRecord> = Object.fromEntries(
  products.map((product) => [product.name, product])
);

const orderiPhoneRepair: OrderRecord = {
  // Order from one week ago
  ...makeBaseRecord(7, 6),
  id: 'or-11-11-11',
  user_id: demoUser.id,
  get net_total() {
    return this.lines.reduce((acc, line) => line.net_total + acc, 0);
  },

  description: 'iPhone repair order from Fix That Phone',

  status: 'in-progress',
  lines: [
    {
      ...makeBaseRecord(7, 6),
      id: makeId('ol'),
      order_id: 'or-11-11-11',
      product_id: productMap['iPhone Screen Repair'].id,
      product_name: productMap['iPhone Screen Repair'].name,
      quantity: 1,
      unit_price: productMap['iPhone Screen Repair'].unit_price,
      get net_total() {
        return this.quantity * this.unit_price;
      },
    },
    {
      ...makeBaseRecord(7, 6),
      id: makeId('ol'),
      order_id: 'or-11-11-11',
      product_id: productMap['iPhone Battery Replacement'].id,
      product_name: productMap['iPhone Battery Replacement'].name,
      quantity: 2,
      unit_price: productMap['iPhone Battery Replacement'].unit_price,
      get net_total() {
        return this.quantity * this.unit_price;
      },
    },
  ],
};

// const orderExpensive: OrderRecord = {
//   // Order from one week ago
//   ...makeBaseRecord(2, 1),
//   id: 'or-22-22-22',
//   user_id: demoUser.id,
//   get net_total() {
//     return this.lines.reduce((acc, line) => line.net_total + acc, 0);
//   },
//   description: 'Grocery order from Jewel Osco',
//   status: 'delivered',
//   lines: [
//     {
//       ...makeBaseRecord(7, 6),
//       id: makeId('ol'),
//       order_id: 'or-22-22-22',
//       product_id: productMap['Premium Japanese Wagyu Steak (1 lb)'].id,
//       product_name: productMap['Premium Japanese Wagyu Steak (1 lb)'].name,
//       quantity: 1,
//       unit_price: productMap['Premium Japanese Wagyu Steak (1 lb)'].unit_price,
//       get net_total() {
//         return this.quantity * this.unit_price;
//       },
//     },
//     {
//       ...makeBaseRecord(7, 6),
//       id: makeId('ol'),
//       order_id: 'or-22-22-22',
//       product_id: productMap['Whole Wheat Bread'].id,
//       product_name: productMap['Whole Wheat Bread'].name,
//       quantity: 2,
//       unit_price: productMap['Whole Wheat Bread'].unit_price,
//       get net_total() {
//         return this.quantity * this.unit_price;
//       },
//     },
//   ],
// };

const orders: OrderRecord[] = [orderiPhoneRepair];

console.log('Mock DB initialized with:');
console.log(`- ${users.length} users`);
console.log(`- ${products.length} products`);
console.log(`- ${orders.length} orders`);

/****************************************************
 Exported Mock Database
****************************************************/

export const db = { orders, products, users };

/****************************************************
 Utilities
****************************************************/
function makeBaseRecord(createdAgo?: number, updatedAgo?: number) {
  const updated = updatedAgo ?? Math.floor(Math.random() * 100);
  const created = createdAgo ?? Math.floor(updated + Math.random() * 500);

  return {
    created_at: getPastDateISO(created),
    updated_at: getPastDateISO(updated),
  };
}

export function getPastDateISO(n: number, time?: string): string {
  const date = new Date();
  date.setDate(date.getDate() - n);

  if (time) {
    const [hours, minutes, seconds] = time.split(':').map(Number);

    if (
      isNaN(hours) ||
      isNaN(minutes) ||
      isNaN(seconds) ||
      hours < 0 ||
      hours > 23 ||
      minutes < 0 ||
      minutes > 59 ||
      seconds < 0 ||
      seconds > 59
    ) {
      throw new Error("Invalid time format. Use 'HH:mm:ss' (24-hour format).");
    }

    date.setHours(hours, minutes, seconds, 0);
  }

  return date.toISOString();
}

function makeId(prefix: string): string {
  const getTwoDigitNumber = (): string => {
    const num = Math.floor(Math.random() * 100); // 0 to 99
    return num.toString().padStart(2, '0');
  };

  return `${prefix}-${getTwoDigitNumber()}-${getTwoDigitNumber()}-${getTwoDigitNumber()}`;
}
