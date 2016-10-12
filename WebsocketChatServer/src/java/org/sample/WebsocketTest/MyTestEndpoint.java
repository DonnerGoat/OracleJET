/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package org.sample.WebsocketTest;

import java.io.IOException;
import java.util.Collections;
import java.util.HashSet;
import java.util.Set;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.websocket.OnClose;
import javax.websocket.OnMessage;
import javax.websocket.OnOpen;
import javax.websocket.Session;
import javax.websocket.server.ServerEndpoint;

/**
 *
 * @author sebastian
 */
@ServerEndpoint("/websockettestendpoint")
public class MyTestEndpoint {

    private static Set<Session> peers = Collections.synchronizedSet(new HashSet<Session>());

    @OnMessage
    public void onMessage(String message, Session session) {
        System.out.println("Message from " + session.getId() + ": " + message);
        try {
            for(Session s : peers) {
                s.getBasicRemote().sendText(message);
            }
        } catch (IOException ex) {
            Logger.getLogger(MyTestEndpoint.class.getName()).log(Level.SEVERE, null, ex);
        }
    }

    @OnOpen
    public void onOpen(Session peer) {
        System.out.println(peer.getId() + " has opened a connection"); 
        peers.add(peer);
    }

    @OnClose
    public void onClose(Session peer) {
        peers.remove(peer);
    }
}
