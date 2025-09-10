import Twilio from 'twilio';
import { v4 as uuidV4 } from 'uuid';
import { db } from '../../../integration-server/mock-database.js';
import {
  DEFAULT_TWILIO_NUMBER,
  TWILIO_ACCOUNT_SID,
  TWILIO_API_KEY,
  TWILIO_API_SECRET,
} from '../../../shared/env.js';
import type { AuxiliaryMessage } from '../../../shared/session/context.js';
import type { ToolExecutor } from '../../types.js';

const twilio = Twilio(TWILIO_API_KEY, TWILIO_API_SECRET, {
  accountSid: TWILIO_ACCOUNT_SID,
});

/****************************************************
 Get User By Email or Phone
****************************************************/
interface GetUserByEmailOrPhone {
  email?: string;
  phone?: string;
}

export const getUserByEmailOrPhone: ToolExecutor<
  GetUserByEmailOrPhone
> = async (args, deps) => {
  console.log('getUserByEmailOrPhone', args);
  await sleep(600);
  if (!args.email && !args.phone) return;

  const _email = args.email?.toLowerCase().trim();
  const _phone = args.phone?.replace(/\D/g, '');
  const user = db.users.find((user) => {
    if (_email && user.email?.toLowerCase() === _email) return true;
    if (_phone && _phone === user.mobile_phone?.replace(/\D/g, '')) return true;

    return false;
  });

  if (user) deps.store.setContext({ user }); // set the user in the session context after successfully fetching
  console.log('getUserByEmailOrPhone result', user);
  return user;
};

/****************************************************
 Get Order By Confirmation Number
****************************************************/
interface GetOrderByConfirmationNumber {
  orderId: string;
}

export const getOrderByConfirmationNumber: ToolExecutor<
  GetOrderByConfirmationNumber
> = async (args, deps) => {
  await sleep(500);

  const orderId = args.orderId.replace(/\-/g, '').toLowerCase();

  return db.orders.find(
    (order) => order.id.replace(/\-/g, '').toLowerCase() === orderId
  );
};

/****************************************************
 Get User Orders
****************************************************/
interface GetUserOrders {
  userId: string;
}

export const getUserOrders: ToolExecutor<GetUserOrders> = async (
  args,
  deps
) => {
  await sleep(500); // simulate latency

  const userId = args.userId.replace(/\-/g, '').toLowerCase();

  return db.orders.filter(
    (order) => order.user_id.replace(/\-/g, '').toLowerCase() === userId
  );
};

/****************************************************
 Send SMS Quote Details
****************************************************/
interface SendSmsQuoteParams {
  phone: string;
  products: string[];
}

export const sendSmsQuote: ToolExecutor<SendSmsQuoteParams> = async (
  args,
  deps
) => {
  const to =
    deps.store.context.user?.mobile_phone ??
    (deps.store.context.call?.participantPhone as string);

  const firstName = deps.store.context.user?.first_name;

  let body = '';
  if (firstName) body += `Hello ${firstName},\n`;
  else body += 'Hello,\n';

  const companyName = deps.store.context.company?.name;
  body += `This is a message from the AI agent at ${companyName}. Here are the details of your quote:\n`;

  for (const product of args.products) {
    body += `${product}\n`;
  }

  if (DEFAULT_TWILIO_NUMBER)
    await twilio.messages.create({ from: DEFAULT_TWILIO_NUMBER, to, body });
  else
    deps.log.warn(
      'tools',
      'sendSmsQuote did not send a real SMS because no phone number was defined.'
    );

  const msg: AuxiliaryMessage = {
    body,
    channel: 'sms',
    createdAt: new Date().toISOString(),
    from: DEFAULT_TWILIO_NUMBER ?? '+18885550001',
    to,
    id: uuidV4(),
  };

  deps.store.setContext({
    auxiliaryMessages: {
      ...(deps.store.context.auxiliaryMessages ?? {}),
      [msg.id]: msg,
    },
  });

  return 'SMS sent successfully';
};

interface LookupServiceFeesParams {
  product: string;
}

export const lookupServiceFees: ToolExecutor<LookupServiceFeesParams> = async (
  args,
  deps
) => {
  await sleep(300);

  return db.products;
};

/****************************************************
 Helpers
****************************************************/
async function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(() => resolve(true), ms));
}
