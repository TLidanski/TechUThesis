import io from 'socket.io';
import { getRepository, In } from 'typeorm';

import { ChatRoom } from '../entity/ChatRoom';
import { ChatMessage } from '../entity/ChatMessage';

export class ChatService {
    private io;
    private room: any;
    private roomRepository = getRepository(ChatRoom);
    private messageRepository = getRepository(ChatMessage);

    constructor(server: any) {
        this.io = server;
        this.initConnection();
    }

    private initConnection = () => {
        this.io.on('connection', (socket: any) => {
            console.log(`Connection established - ${socket.id}`);

            socket.on('join-room', async (data: any) => {
                this.room = await this.roomRepository.findOne({
                    where: [
                        {name: `${data.currentUser.id}-${data.user.id}`},
                        {name: `${data.user.id}-${data.currentUser.id}`}
                    ]
                });

                if (!this.room) {
                    let newRoom = new ChatRoom();
                    newRoom.name = `${data.currentUser.id}-${data.user.id}`;
                    newRoom.users = [data.currentUser, data.user];

                    this.room = await this.roomRepository.save(newRoom);
                    
                    socket.join(this.room.id);
                } else {
                    socket.join(this.room.id);
                }
            });

            socket.on('message', async (msgObj: any) => {
                let message = new ChatMessage();
                message.message = msgObj.msg;
                message.author = msgObj.user;
                message.room = this.room;

                const newMsg = await this.messageRepository.save(message);
                this.io.to(this.room.id).emit('server-message', newMsg);
            });

            socket.on('disconnect', () => {
                console.log('Disconnected')
            });
        });
    }
}