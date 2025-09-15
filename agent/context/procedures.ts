import type { Procedure } from '../types.js';

export const procedures: Record<string, Procedure> = [
  {
    id: 'identify_user',
    description:
      'Verify the identity of a user through context or active identification',
    steps: [
      {
        id: 'get_identifier',
        description:
          'Gather an identifier from the user that can be used to lookup their account.',
        strictness: 'conditional',
        completionCriteria:
          'Valid email address or phone number has been provided',
        conditions:
          "This is not required when the user's profile has been provided in context. ",
        instructions: '',
      },
      {
        id: 'verify_identifier',
        description: 'Verify the provided identifier is valid',
        strictness: 'conditional',
        completionCriteria: 'Identifier has been validated',
        conditions: 'Required when get_identifier step was performed',
        instructions:
          'Ensure email format is valid or phone number is in correct format',
      },
      {
        id: 'confirm_identity',
        description: 'Confirm user identity using available information',
        strictness: 'required',
        completionCriteria: 'User has verbally confirmed their identity',
        instructions:
          'If profile exists in context, confirm name. Otherwise, confirm details from identifier.',
      },
    ],
  },
  {
    id: 'provide_order_information',
    description:
      'Retrieve and present order information based on available context and identifiers',
    steps: [
      {
        id: 'identify_user',
        description: 'Verify user identity if needed',
        strictness: 'conditional',
        completionCriteria:
          'Either confirmation number provided OR user identity verified',
        conditions: 'Skip if valid confirmation number provided',
        instructions:
          'Only perform user identification if no confirmation number is provided',
      },
      {
        id: 'gather_order_details',
        description: 'Collect information needed to locate the order',
        strictness: 'critical',
        completionCriteria:
          'Either: (A) Valid CN-00-00-00 format confirmation number obtained, OR (B) Order description collected from verified user',
        instructions:
          'Accept confirmation number or gather order description if user is verified',
      },
      {
        id: 'confirm_order',
        description: 'Verify order details with user',
        strictness: 'required',
        completionCriteria: 'User has confirmed the order details are correct',
        instructions:
          'Review key order details with user to ensure correct order was found',
      },
    ],
  },
  {
    id: 'quote_service_fees',
    description:
      'Provide accurate quotes for service fees based on product or service details',
    steps: [
      {
        id: 'gather_product_details',
        description: 'Collect necessary details about the product or service',
        strictness: 'critical',
        completionCriteria:
          'Sufficient details have been gathered to identify the product or service',
        instructions:
          'Ask for product type, model, issue description, or other relevant details',
      },
      {
        id: 'lookup_service_fees',
        description: 'Find applicable service fees based on gathered details',
        strictness: 'critical',
        completionCriteria:
          'Service fees have been identified from the database or pricing list',
        instructions:
          'Use product details to search pricing database for matching service fees',
      },
      {
        id: 'present_quote',
        description: 'Provide the user with a clear and accurate quote',
        strictness: 'required',
        completionCriteria:
          'User has received and acknowledged the service fee quote',
        instructions:
          'Clearly communicate the service fees, including any taxes or additional charges',
      },
      {
        id: 'send_quote_by_sms',
        description: 'Send the service fee quote to the user via SMS',
        strictness: 'optional',
        completionCriteria: 'User has received the quote via SMS',
        conditions: 'If the user asks for it to be sent by SMS',
        instructions:
          'Execute the tool to send an SMS with the quote details to the user',
      },
    ],
  },
].reduce((acc, cur) => Object.assign(acc, { [cur.id]: cur }), {});
