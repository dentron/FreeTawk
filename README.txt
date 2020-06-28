 ______   ______     ______     ______     ______   ______     __     __     __  __    
/\  ___\ /\  == \   /\  ___\   /\  ___\   /\__  _\ /\  __ \   /\ \  _ \ \   /\ \/ /    
\ \  __\ \ \  __<   \ \  __\   \ \  __\   \/_/\ \/ \ \  __ \  \ \ \/ ".\ \  \ \  _"-.  
 \ \_\    \ \_\ \_\  \ \_____\  \ \_____\    \ \_\  \ \_\ \_\  \ \__/".~\_\  \ \_\ \_\ 
  \/_/     \/_/ /_/   \/_____/   \/_____/     \/_/   \/_/\/_/   \/_/   \/_/   \/_/\/_/ 
                                                                                       

If you are using this, then you probably hate big tech censorship, good.

This is essentially a basic ciphering prototype I made in a weekend, its main purpose is to be as easy to use as possible,
and to avoid the shit censor bots that plague modern sites. I decided to open source it since I have other stuff to work on,
and I hope that people may start using and modifying this to talk the way they want to online, freely.  

The functionality currently in the program is to right or left shift characters in the message, and can be either alphabet based (A-Z), or ASCII based (Any printable ASCII character).

To install: Open your browser's extensions page (usually CTRL+SHIFT+E), enable developer mode, and "Load Unpacked". Then select the folder with the source code in it, 
you should then see the icon appear in the upper right of the browser, click it to open the pop-up messaging tool. As a chromium extension, it should work on about 70% of modern 
broswers, a port to FireFox could be done, but if someone wants that you have to do it yourself.

The generic message structure is as follows
(TAGS)(DELIMITER)(MESSAGE)(IDENTIFIER)

- TAGS - 
This is what tells the decoder or encoder what to do to each character in the message. The basic form of a tag is TAG+NUMBER. For example, a basic ASCII left shift of 5
is <5. Multiple tags can be strung together for changing characters i.e. <5>8. 
The basic tags are "<",">","L","R","AL","AR","A<","A>", these can be modified in the source files, and should be self explanatory to edit for anyone with basic programming knowledge.

- DELIMITER - 
This is simply the character(s) that signal the end of the delimiter and the start of the message. This can be easily edited in the source files to evade detection.

- MESSAGE -
This the message you typed in for a comment or something along those lines.

- IDENTIFIER - 
This is the part of the message that confirms whether the message was meant for FT to decode. This is slightly pointless for manual decoding, but I had thought about 
automatic decoding with content scripts on a per-website basis. There is an example for youtube automatic decoding in the js/websites folder. It is quite buggy and only works
for comments without newlines or links. This is mostly because the YT commenting HTML format is a bitch to work with. I got tired of working on this at about that point,
so if you want to custom make a content script for decoding with the backend then use that as a guide. You also have to add it to the manifest look here under Declarative Injection
for info on how to do it using the link below. This can be actually placed anywhere in the MESSAGE and it will be automatically removed from the decoded message.

https://developer.chrome.com/extensions/content_scripts

As a small tutorial for use here it is. First, uner "Create Message" type your message into the 'Enter message' field and enter a tag according to above. Then hit the big 
encode button, your message will appear ciphered in a grey colored box. This can then be copied and pasted into your website or messaging app of choice! You can take your message and put it 
into the "Message to decode" field (you can leave the other alone) Press the corresponding button and your message should be spit back to you. This is how others can see your message.

A few notes:

- This can easily disguise links with the ascii shifts, use it to your advantage

- On the reverse side, messages could contain slashes (/ or \) after encoding which can set off link filters on certain sites. Try to avoid this by changing your shift values

- If enough people use this, detection could result, try to make custom tags and even new encoding/decoding methods to communicate, share these with others to bypass censorship.

- If people do pick up the ball and roll with this, you have to edit decoding in the background JS file, and encoding in the popup JS file. I added some sparse comments to help.
