import { Inject, Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { ChatGroupSummary, ChatGroupHistory } from '../shared/models';
import { Observable } from 'rxjs/Observable';
import { Http, Headers } from '@angular/http';
import { AuthenticationService } from '../services/authentication.service';
import 'expose-loader?jQuery!jquery';
import 'expose-loader?$!jquery';
import * as $ from 'jquery';
import 'ms-signalr-client';
import 'rxjs/Rx';

@Injectable()
export class ChatService {
    private connection: any;
    private chatHub: any;

    // events sources
    private connectionStartedSource = new Subject<string>();
    private messageReceivedSource = new Subject<string>();
    private statusChangedSource = new Subject<ConnectionStatus>();
    // events
    public connectionStarted$ = this.connectionStartedSource.asObservable();
    public messageReceived$ = this.messageReceivedSource.asObservable();
    public statusChanged$ = this.statusChangedSource.asObservable();

    constructor(private authenticationService: AuthenticationService, @Inject('API_URL') private apiUrl: string, private http: Http) {
        this.connection = $.hubConnection(this.apiUrl);
        this.connection.logging = true;

        var self = this;
        this.chatHub = this.connection.createHubProxy('ChatHub');
        this.chatHub.on('messageReceived', function (message) {
            self.sendAck(message.DestinationId, message.Id);
            self.messageReceivedSource.next(message);
        });

        this.connection.connectionSlow(function () {
            console.log("connectionSlow");
            self.statusChangedSource.next(ConnectionStatus.slowConnection);
        });

        this.connection.stateChanged(function (state: SignalRStateChangeModel) {
            console.log("stateChanged");
            console.log(state);
            var x = state.newState as number as ConnectionStatus;
            self.statusChangedSource.next(x);
        });
    }

    /**
     * start connection and return connection id
     */
    start(): Observable<string> {
        var self = this;

        var result: Observable<string> = Observable.create(observer => {
            this.authenticationService.getAccessTokenAsync().subscribe(at => {
                $.signalR.ajaxDefaults.headers = { Authorization: "Bearer " + at };

                this.connection.start()
                    .done(function () {
                        observer.next(self.connection.id);
                        observer.complete();
                        self.connectionStartedSource.next(self.connection.id);
                    })
                    .fail(function (e) {
                        observer.error(e);
                        observer.complete();
                        console.log(e);
                        self.connectionStartedSource.error(e);
                    });
            });
        });

        return result;
    }
    /**
     * Register the current connection to receive push messages
     */
    register(): Observable<void> {
        var self = this;

        var result: Observable<void> = Observable.create(observer => {
            this.chatHub.invoke('register')
                .done(function () {
                    observer.next(self.connection.id);
                })
                .fail(function (e) {
                    observer.error(e);
                    console.log(e);
                })
                .then(() => {
                    observer.complete();
                });
        });

        return result;
    }
    /**
     * stop the connection to the SignalR server
     */
    stop() {
        // TODO : stop the connection
    }
    /**
     * send text message to destination (Group for now)
     * @param destinationId : group id
     * @param message : the message content
     */
    sendTextMessage(destinationId: number, message: string) {
        // TODO : return message id
        var clientMessage = {
            destinationId: destinationId,
            body: message,
            clientSentDate: new Date()
        };

        this.chatHub.invoke('sendMessage', clientMessage)
            .done(r => {

            });
    }
    /**
     * Send confirmation that a message was successfully received
     * @param destinationId
     * @param messageId
     */
    sendAck(destinationId: number, messageId: number) {
        var ackMessage = {
            destinationId: destinationId,
            messageId: messageId,
        };

        this.chatHub.invoke('ackMessage', ackMessage)
            .done(r => {

            });
    }
    /**
     * Set a message as read by the current logged in user
     * @param messageId
     */
    setMessageAsRead(messageId: number) {
        this.authenticationService.getAccessTokenAsync().subscribe(at => {
            let url = this.apiUrl + "/api/chat/message/read?messageId=" + messageId;

            var requestArgs = {
                headers: new Headers()
            };
            requestArgs.headers.append("Authorization", "Bearer " + at);

            this.http.post(url, {}, requestArgs).subscribe(r => { });
        });
    }
    /**
     * Set messages as read by the current logged in user
     * @param messagesIds
     */
    setMessagesAsRead(messagesIds: number[]) {
        this.authenticationService.getAccessTokenAsync().subscribe(at => {
            let url = this.apiUrl + "/api/chat/messages/read";
            var requestArgs = {
                headers: new Headers()
            };
            requestArgs.headers.append("Authorization", "Bearer " + at);
            this.http.post(url, messagesIds, requestArgs).subscribe(r => { });
        });
    }
    /**
     * get all groups with number of unread messages (unread by the current user)
     */
    getGroupsSummary(): Observable<ChatGroupSummary[]> {
        return Observable.create(observer => {
            this.authenticationService.getAccessTokenAsync().subscribe(at => {
                var url = this.apiUrl + '/api/chat/groups/summary';
                var requestArgs = {
                    headers: new Headers()
                };
                requestArgs.headers.append("Authorization", "Bearer " + at);

                this.http.get(url, requestArgs).map(g => g.json() as ChatGroupSummary[]).subscribe(g => {
                    observer.next(g);
                    observer.complete();
                });
            });
        });
    }
    /**
     * Get group name and history for the last 2 days
     * @param groupId : id of the group
     */
    getGroupHistory(groupId: number): Observable<ChatGroupHistory> {
        return Observable.create(observer => {
            this.authenticationService.getAccessTokenAsync().subscribe(at => {
                let url = this.apiUrl + '/api/chat/group/history?groupId=' + groupId;
                var requestArgs = {
                    headers: new Headers()
                };
                requestArgs.headers.append("Authorization", "Bearer " + at);
                this.http.get(url, requestArgs).map(res => res.json() as ChatGroupHistory[]).subscribe(gh => {
                    observer.next(gh);
                    observer.complete();
                });
            });
        });
    }
}

interface SignalRStateChangeModel {
    oldState: SignalRConnectionState,
    newState: SignalRConnectionState
}

enum SignalRConnectionState {
    connecting = 0,
    connected = 1,
    reconnecting = 2,
    disconnected = 4
}

export enum ConnectionStatus {
    connecting = 0,
    connected = 1,
    reconnecting = 2,
    disconnected = 4,
    slowConnection = 5
}