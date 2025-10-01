import { MessageType } from "@/features/props.types/center.types";
import { SocketStoreType } from "@/service/socket.io";
import { User } from "@/store/user.store";
import { Folder, Group } from "@mui/icons-material"
import AssistantPhotoIcon from '@mui/icons-material/AssistantPhoto';
import ContactsIcon from '@mui/icons-material/Contacts';

export const leftItems = [
    {
        label: "Contacts",
        icon: <ContactsIcon fontSize='small'> </ContactsIcon>
    },
    {
        label: "Groupes",
        icon: <Group fontSize='small'> </Group>
    },
    {
        label: "Channels",
        icon: <AssistantPhotoIcon fontSize='small'> </AssistantPhotoIcon>
    },
]



export type leftPropsType = {props : {users :  Record<string, any>[],user : User | null ,handleChatUser : Function}}

export type LeftProps = {
    props : {
  setOpen: () => void;
  isOpenMenu: boolean;
  socketStore: SocketStoreType;
  selectedChat: Record<string, any> | null;
  messages: MessageType[];
  setSlectedChat: React.Dispatch<React.SetStateAction<Record<string, any> | null>>;
  setMessages: React.Dispatch<React.SetStateAction<MessageType[]>>;
}
};