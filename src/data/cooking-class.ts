/**
 * Single source of truth for the Swahili Coast Cooking Class page.
 * Content mirrors the Echo experience listing (November 2026).
 */

export const COOKING_CLASS_URL = 'https://www.chefangela.co.ke/cooking-class'
export const COOKING_CLASS_NAME = 'Swahili Coast Cooking Class with Chef Angela'
export const COOKING_CLASS_PRICE_KES = 8000
export const COOKING_CLASS_MAX_GUESTS = 6
export const COOKING_CLASS_MAX_HOURS = 6
export const COOKING_CLASS_NOTICE_HOURS = 48

export const COOKING_CLASS_WHATSAPP_NUMBER = '254706310918'

export const COOKING_CLASS_SPICES = ['Cardamom', 'Cinnamon', 'Cloves', 'Coconut', 'Tamarind']

export interface ClassFact {
  label: string
  value: string
  detail?: string
}

export const classFacts: ClassFact[] = [
  { label: 'Format', value: 'Private, hands-on', detail: 'Just you and your group with Chef Angela' },
  { label: 'Duration', value: `Up to ${COOKING_CLASS_MAX_HOURS} hours`, detail: 'A full menu, starter to dessert' },
  { label: 'Group size', value: `1 to ${COOKING_CLASS_MAX_GUESTS} guests`, detail: 'Couples, families and small groups' },
  { label: 'Price', value: `${COOKING_CLASS_PRICE_KES.toLocaleString('en-US')} KES`, detail: 'Per person, ingredients not included' },
  { label: 'Location', value: 'Where you are staying', detail: 'Your villa or holiday home, anywhere in Diani' },
  { label: 'Languages', value: 'English, Swahili', detail: 'Angela explains every step as you go' },
  { label: 'Booking', value: `${COOKING_CLASS_NOTICE_HOURS}h in advance`, detail: 'Time to plan the menu and shop' },
  { label: 'Payment', value: 'Cash on the day', detail: 'Kenyan shillings or US dollars' },
]

export const whatYouDo: string[] = [
  'Cook a full Swahili coast menu, from starter to dessert, designed by Angela for your session',
  'Prepare every dish together, step by step, with each technique explained as you go',
  'Get to know the key local spices: cardamom, cinnamon, cloves, coconut and tamarind',
  'Sit down and enjoy the meal you prepared',
  'Leave with the recipes so you can cook them again at home',
]

export interface ClassStep {
  title: string
  description: string
}

export const howItWorks: ClassStep[] = [
  {
    title: 'Book on WhatsApp',
    description: `Send Angela your dates, group size and where you are staying, at least ${COOKING_CLASS_NOTICE_HOURS} hours ahead. Mention any allergies or dietary needs.`,
  },
  {
    title: 'Get your menu and cost breakdown',
    description: 'Angela designs the menu and sends an estimate for the ingredients, which you pay in advance.',
  },
  {
    title: 'Angela does the shopping',
    description: 'Fresh produce from the Diani markets. She shares the receipts, and any difference is settled on the day.',
  },
  {
    title: 'Cook, eat, keep the recipes',
    description: 'Angela comes to you. You cook the full menu together, enjoy it, and go home with the recipes.',
  },
]

export interface ClassFaq {
  question: string
  answer: string
}

export const classFaq: ClassFaq[] = [
  {
    question: 'Do I need any cooking experience?',
    answer: 'No. The class is suitable for complete beginners. Angela adapts the pace to your group and explains every step.',
  },
  {
    question: 'Where does the class take place?',
    answer: 'Wherever is most convenient for you in Diani: your villa, apartment or holiday home. Angela travels to you, so you only need a kitchen. There is no pick-up service.',
  },
  {
    question: 'What is included in the price?',
    answer: `The ${COOKING_CLASS_PRICE_KES.toLocaleString('en-US')} KES per person covers Angela's time, the menu design, the teaching and the recipes. Ingredients are paid separately in advance, based on the cost breakdown she sends you. Drinks are not included. Special Swahili spices are available as an extra on request.`,
  },
  {
    question: 'How and when do I pay?',
    answer: 'The ingredients are paid in advance once you receive the cost breakdown. The class fee is paid in cash on the day, in Kenyan shillings or US dollars.',
  },
  {
    question: 'Can children join?',
    answer: 'Yes, children are welcome when accompanied by an adult.',
  },
  {
    question: 'What about allergies or dietary needs?',
    answer: 'Share them when you book. Angela adapts the menu so everyone in your group can cook and eat together.',
  },
  {
    question: 'Is the class suitable for limited mobility?',
    answer: 'Yes. The class takes place in your own space and the steps can be done seated. Tell Angela what you need when you book.',
  },
  {
    question: 'How far ahead should I book?',
    answer: `At least ${COOKING_CLASS_NOTICE_HOURS} hours before the class, so Angela can plan the menu, send the cost breakdown and do the shopping. Classes run any day of the week, subject to her availability.`,
  },
]

const bookingMessage = [
  "Hello Chef Angie! I'd like to book a cooking class.",
  'Date: ____',
  'Number of guests: ____',
  'Where we are staying: ____',
  'Allergies / dietary needs: ____',
].join('\n')

export const COOKING_CLASS_BOOKING_URL = `https://wa.me/${COOKING_CLASS_WHATSAPP_NUMBER}?text=${encodeURIComponent(bookingMessage)}`
