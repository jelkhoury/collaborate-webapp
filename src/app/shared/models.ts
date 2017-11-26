export enum Gender {
    Male = 1,
    Female = 2
}

export enum MaritalStatus {
    Unspecified = 0,
    Single = 1,
    NotSingle = 2
}

export interface Department {
    id: number;
    name: string;
}

export interface Position {
    id: number;
    title: string;
}

export interface User {
    id: number,
    username: string;
    profile: UserProfile;
}

export interface UserProfile {
    firstName: string;
    lastName: string;
    nickname: string;
}

// chat
export interface ChatGroupSummary {
    destinationId: number;
    destinationName: string;
    unreadMessagesCount: number;
}

export interface ChatGroupTextMessage {
    id: number;
    /*
     sender username
    */
    sender: string;
    senderUserId?: number;
    text: string;
    isRead?: boolean;
    dateSent?: Date;
    dateReceived?: Date;
    isFromMe?: boolean;
}

export interface ChatGroupHistory {
    id: number;
    name: string;
    members: string[];
    messages: ChatGroupTextMessage[];
}