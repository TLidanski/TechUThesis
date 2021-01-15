import io from 'socket.io';
import { getRepository, In } from 'typeorm';

import { ChatRoom } from '../entity/ChatRoom';
import { ChatMessage } from '../entity/ChatMessage';

export class ChatService {
    private io;
    private roomRepository = getRepository(ChatRoom);
    private messageRepository = getRepository(ChatMessage);

    constructor(server: any) {
        this.io = server;
        this.initConnection();
    }

    private initConnection = () => {
        this.io.on('connection', (socket: any) => {

            socket.on('join-room', async (data: any) => {
                let room = await this.roomRepository.findOne({
                    where: [
                        {name: `${data.currentUser.id}-${data.user.id}`},
                        {name: `${data.user.id}-${data.currentUser.id}`}
                    ]
                });

                if (!room) {
                    let newRoom = new ChatRoom();
                    newRoom.name = `${data.currentUser.id}-${data.user.id}`;
                    newRoom.users = [data.currentUser, data.user];

                    room = await this.roomRepository.save(newRoom);
                    
                    socket.join(room.id);
                } else {
                    socket.join(room.id);
                }
            });

            socket.on('message', async (msgObj: any) => {
                const room = await this.roomRepository.findOne({
                    where: [
                        {name: `${msgObj.currentUser.id}-${msgObj.user.id}`},
                        {name: `${msgObj.user.id}-${msgObj.currentUser.id}`}
                    ]
                });

                if (room) {
                    let message = new ChatMessage();
                    message.message = msgObj.msg;
                    message.author = msgObj.currentUser;
                    message.room = room;

                    const newMsg = await this.messageRepository.save(message);
                    this.io.to(room.id).emit('server-message', newMsg);
                }
            });

            socket.on('disconnect', () => {});
        });
    }
}