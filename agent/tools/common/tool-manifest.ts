import type { ToolDefinition } from '../../types.js';

export const commonToolManifest: ToolDefinition[] = [
  {
    name: 'getUserByEmailOrPhone',
    description: 'Find a user by their email address or their phone number.',
    type: 'function',
    parameters: {
      type: 'object',
      properties: {
        email: { type: 'string', description: "The user's email address" },
        phone: {
          type: 'string',
          description: "The user's phone in e164 format, i.e. +12223330001",
        },
      },
      required: [],
    },
  },
  {
    name: 'getOrderByConfirmationNumber',
    description: 'Find an order by its confirmation number.',
    type: 'function',
    parameters: {
      type: 'object',
      properties: {
        orderId: { type: 'string', description: 'The ID of the order' },
      },
      required: ['orderId'],
    },
  },
  {
    name: 'getUserOrders',
    description: 'Get all orders for a specific user.',
    type: 'function',
    parameters: {
      type: 'object',
      properties: {
        userId: {
          type: 'string',
          description: 'The user id from the user record',
        },
      },
      required: ['userId'],
    },
  },
  {
    name: 'sendSmsQuote',
    description: 'Send an SMS message to the user with details about a quote.',
    type: 'function',
    parameters: {
      type: 'object',
      properties: {
        products: {
          type: 'array',
          items: { type: 'string' },
          description: 'A list of product names that are included in the quote',
        },
      },
      required: ['phone', 'products'],
    },
  },
  {
    name: 'lookupServiceFees',
    description: 'Return all service fees we provide.',
    type: 'function',
    parameters: {
      type: 'object',
      properties: {
        productDetails: {
          type: 'string',
          description:
            'The general details about what the user wants fixed, be general, valid examples include "screen" or "battery"',
        },
      },
      required: ['productDetails'],
    },
  },
];
