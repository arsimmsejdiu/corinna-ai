// Auth Type

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
  realtime: boolean
  setRealtime: React.Dispatch<React.SetStateAction<boolean>>
  chatRoom: string | undefined
  setChatRoom: React.Dispatch<React.SetStateAction<string | undefined>>
  chats: {
    message: string
    id: string
    role: 'assistant' | 'user' | null
    createdAt: Date
    seen: boolean
  }[]
  setChats: React.Dispatch<
    React.SetStateAction<
      {
        message: string
        id: string
        role: 'assistant' | 'user' | null
        createdAt: Date
        seen: boolean
      }[]
    >
  >
  loading: boolean
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
}
