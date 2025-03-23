import { create } from 'zustand';

type ResponseCreateUserStore = {
  messageResponse: string;
  setMessageResponse: (message: string) => void;
};

export const useResponseCreateUser = create<ResponseCreateUserStore>(set => ({
  messageResponse: '',
  setMessageResponse: message =>
    set(state => ({
      messageResponse: (state.messageResponse = message),
    })),
}));
