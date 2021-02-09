# Simple Chatapp

This chatapp was built using ReactJS and Firebase.

When you open, the initial screen just asks you to provide a username. Submit button is disabled if username is empty.
![Initial screen](https://i.imgur.com/VkqpVgr.png)

When you provide a username, the submit button becomes pressable.
![Screen with username provided](https://i.imgur.com/kmDmyu6.png)

When you press submit, you get taken to the chat area. Your own messages are in pink, others in blue.
The chat just uses realtime listeners on the chat on the firebase and returns it.
Then the useLayoutEffect runs to scroll the user to the bottom.
![Window with the chat](https://i.imgur.com/8iIovzV.png)

