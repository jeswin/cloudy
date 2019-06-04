export interface IContact {
  name: string;
  image: string;
  status?: string;
  lastMessage?: string;
  lastOnlineTimeMS?: number;
  lastMessageMS?: number;
  muted?: boolean;
  blocked?: boolean;
}

export interface IGroup {
  name: string;
  image: string;
  members: IContact[];
  status?: string;
  lastMessage?: string;
  lastMessageMS?: number;
  muted?: boolean;
  blocked?: boolean;
}

export interface IPrivacySettings {
  visibility: {
    online: boolean;
    lastActive: boolean;
  };
}

export interface IMessage {
  type: string;
  text: string;
  from: string;
  to: string[];
  sentAtMS: number;
  preview?: string;
  summary?: string;
  attachments?: IAttachment[];
  deliveredAtMS?: number;
  readAtMS?: number;
}

export interface IAttachment {
  name: string;
  description: string;
  size: string;
  type: string;
  icon: string;
  from: string;
  to: string[];
  sentAtMS: number;
  deliveredAtMS?: number;
}