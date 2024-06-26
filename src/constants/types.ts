// Auth Type

import {
  FieldErrors,
  FieldValues,
  UseFormRegister,
  UseFormSetValue,
} from "react-hook-form";

export type AuthType = {
  children: React.ReactNode;
};

export type UserRegistrationProps = {
  type: string;
  fullname: string;
  email: string;
  confirmEmail: string;
  password: string;
  confirmPassword: string;
  otp: string;
};

export type UserRegistrationFormProps = {
  id: string;
  type: "email" | "text" | "password";
  inputType: "select" | "input";
  options?: { value: string; label: string; id: string }[];
  label?: string;
  placeholder: string;
  name: string;
};

export type UserLoginProps = {
  email: string;
  password: string;
};

export type ChangePasswordProps = {
  password: string;
  confirmPassword: string;
};

// End AuthType
//-----------------------------------------------------------
// Settings Typex

export type DomainSettingsProps = {
  domain?: string;
  image?: any;
  welcomeMessage?: string;
};

export type AddDomainProps = {
  domain?: string;
  image?: any;
};

export type HelpDeskQuestionsProps = {
  question: string;
  answer: string;
};

export type AddProductProps = {
  name: string;
  image?: any;
  price: string;
};

export type FilterQuestionsProps = {
  question: string;
};

// End Setting Type
//-----------------------------------------------------------
// Marketing Type

export type EmailMarketingProps = {
  name: string;
};

export type EmailMarketingBodyProps = {
  description: string;
};

// End Marketing type
//-----------------------------------------------------------
// Conversation Type

export type ConversationSearchProps = {
  query: string;
  domain: string;
};

export type ChatBotMessageProps = {
  content?: string;
  image?: any;
};

// End Conversation type
//-----------------------------------------------------------
// Chat type

export type ChatInitialValuesProps = {
  realtime: boolean;
  setRealtime: React.Dispatch<React.SetStateAction<boolean>>;
  chatRoom: string | undefined;
  setChatRoom: React.Dispatch<React.SetStateAction<string | undefined>>;
  chats: {
    message: string;
    id: string;
    role: "assistant" | "user" | null;
    createdAt: Date;
    seen: boolean;
  }[];
  setChats: React.Dispatch<
    React.SetStateAction<
      {
        message: string;
        id: string;
        role: "assistant" | "user" | null;
        createdAt: Date;
        seen: boolean;
      }[]
    >
  >;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
};

// End Chat type
//-----------------------------------------------------------
// Components Type
export type DataTableProps = {
  headers: string[];
  children: React.ReactNode;
};

export type AppointmentProps = {
  bookings:
    | {
        Customer: {
          Domain: {
            name: string;
          } | null;
        } | null;
        id: string;
        email: string;
        domainId: string | null;
        date: Date;
        slot: string;
        createdAt: Date;
      }[]
    | undefined;
};

export type FormGeneratorProps = {
  type: "text" | "email" | "password";
  inputType: "select" | "input" | "textarea";
  options?: { value: string; label: string; id: string }[];
  label?: string;
  placeholder: string;
  register: UseFormRegister<any>;
  name: string;
  errors: FieldErrors<FieldValues>;
  lines?: number;
  form?: string;
  defaultValue?: string;
};

export type AccountDetailsFormProps = {
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors<FieldValues>;
};

export type UserTypeCardProps = {
  value: string;
  title: string;
  text: string;
  register: UseFormRegister<FieldValues>;
  userType: "owner" | "student";
  setUserType: React.Dispatch<React.SetStateAction<"owner" | "student">>;
};

export type TypeSelectionFormProps = {
  register: UseFormRegister<FieldValues>;
  userType: "owner" | "student";
  setUserType: React.Dispatch<React.SetStateAction<"owner" | "student">>;
};

export type TabsProps = {
  triggers: {
    label: string;
    icon?: JSX.Element;
  }[];
  children: React.ReactNode;
  className?: string;
  button?: JSX.Element;
};

export type SidebarProps = {
  domains:
    | {
        id: string;
        name: string;
        icon: string;
      }[]
    | null
    | undefined;
};

export type MaxMenuProps = {
  onExpand(): void;
  current: string;
  onSignOut(): void;
  domains:
    | {
        id: string;
        name: string;
        icon: string | null;
      }[]
    | null
    | undefined;
};

export type MenuItemProps = {
  size: "max" | "min";
  label: string;
  icon: JSX.Element;
  path?: string;
  current?: string;
  onSignOut?(): void;
};

export type DomainMenuProps = {
  min?: boolean;
  domains:
    | {
        id: string;
        name: string;
        icon: string | null;
      }[]
    | null
    | undefined;
};

export type MinMenuProps = {
  onShrink(): void;
  current: string;
  onSignOut(): void;
  domains:
    | {
        id: string;
        name: string;
        icon: string | null;
      }[]
    | null
    | undefined;
};

export type UploadButtonProps = {
  register: UseFormRegister<any>;
  errors: FieldErrors<FieldValues>;
  label: string;
};

export type SideSheetProps = {
  trigger: React.ReactNode;
  title: string;
  description: string;
  children: React.ReactNode;
  className?: string;
};

export type ModalProps = {
  trigger: React.ReactNode;
  children: React.ReactNode;
  title: string;
  description: string;
  type?: "Integration";
  logo?: string;
};

export type SubscriptionCardProps = {
  title: string;
  description: string;
  price: string;
  onPayment(payment: string): void;
  payment: string;
  id: string;
};

export type EmailMarketingsProps = {
  domains: {
    customer: {
      Domain: {
        name: string;
      } | null;
      id: string;
      email: string | null;
    }[];
  }[];
  campaign: {
    name: string;
    id: string;
    customers: string[];
    createdAt: Date;
  }[];
  subscription: {
    plan: "STANDARD" | "PRO" | "ULTIMATE";
    credits: number;
  } | null;
};

export type CustomerTableProps = {
  domains: {
    customer: {
      Domain: {
        name: string;
      } | null;
      id: string;
      email: string | null;
    }[];
  }[];
  onSelect(email: string): void;
  select: string[];
  onId(id: string): void;
  id?: string;
};

export type EditEmailProps = {
  id: string;
  onCreate(): void;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors<FieldValues>;
  setDefault: UseFormSetValue<FieldValues>;
};

export type DomainUpdateProps = {
  name: string;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors<FieldValues>;
};

export type GreetingMessageProps = {
  message: string;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors<FieldValues>;
};

export type SettingsFormProps = {
  id: string;
  name: string;
  plan: "STANDARD" | "PRO" | "ULTIMATE";
  chatBot: {
    id: string;
    icon: string | null;
    welcomeMessage: string | null;
  } | null;
};

export type PortalFormProps = {
  questions: {
    id: string;
    question: string;
    answered: string | null;
  }[];
  type: "Appointment" | "Payment";
  customerId: string;
  domainid: string;
  email: string;
  bookings?:
    | {
        date: Date;
        slot: string;
      }[]
    | undefined;
  products?:
    | {
        name: string;
        image: string;
        price: number;
      }[]
    | undefined;
  amount?: number;
  stripeId?: string;
};

export type PortalStepsProps = {
  questions: {
    id: string;
    question: string;
    answered: string | null;
  }[];
  type: "Appointment" | "Payment";
  register: UseFormRegister<FieldValues>;
  error: FieldErrors<FieldValues>;
  onNext(): void;
  step: number;
  date: Date | undefined;
  onBooking: React.Dispatch<React.SetStateAction<Date | undefined>>;
  onBack(): void;
  onSlot(slot: string): void;
  slot?: string;
  loading: boolean;
  bookings?:
    | {
        date: Date;
        slot: string;
      }[]
    | undefined;
  products?:
    | {
        name: string;
        image: string;
        price: number;
      }[]
    | undefined;
  amount?: number;
  stripeId?: string;
};

export type PortalQuestionsFormProps = {
  questions: {
    id: string;
    question: string;
    answered: string | null;
  }[];
  register: UseFormRegister<FieldValues>;
  error: FieldErrors<FieldValues>;
  onNext(): void;
};

export type PortalBookingDateFormProps = {
  date: Date | undefined;
  onBooking: React.Dispatch<React.SetStateAction<Date | undefined>>;
  onBack(): void;
  register: UseFormRegister<FieldValues>;
  onSlot(slot: string): void;
  currentSlot?: string;
  loading: boolean;
  bookings:
    | {
        date: Date;
        slot: string;
      }[]
    | undefined;
};

export type PortalPaymentCheckoutProps = {
  onBack(): void
  products?:
    | {
        name: string
        image: string
        price: number
      }[]
    | undefined
  amount?: number
  onNext(): void
  stripeId?: string
}

// End Components type
//-----------------------------------------------------------
// Chatbot

export type WindowChatbotProps = {
  errors: any;
  register: UseFormRegister<ChatBotMessageProps>;
  chats: { role: "assistant" | "user"; content: string; link?: string }[];
  onChat(): void;
  onResponding: boolean;
  domainName: string;
  theme?: string | null;
  textColor?: string | null;
  help?: boolean;
  realtimeMode:
    | {
        chatroom: string;
        mode: boolean;
      }
    | undefined;
  helpdesk: {
    id: string;
    question: string;
    answer: string;
    domainId: string | null;
  }[];
  setChat: React.Dispatch<
    React.SetStateAction<
      {
        role: "user" | "assistant";
        content: string;
        link?: string | undefined;
      }[]
    >
  >;
};

export type EditChatbotIconProps = {
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors<FieldValues>;
  chatBot: {
    id: string;
    icon: string | null;
    welcomeMessage: string | null;
  } | null;
};

// End Chatbot type
//-----------------------------------------------------------

export type EmojiPickerProps = {
  onChange: (value: string) => void;
};

export type ActionTooltipProps = {
  label: string;
  children: React.ReactNode;
  side?: "top" | "right" | "bottom" | "left";
  align?: "start" | "center" | "end";
};
