# Tracking shipments simulator
## Final Project in Big Data course


![image](https://github.com/tehilabk/Big-Data-Cloud-Ecosystems-Project/blob/master/public/images/diagram.PNG)




To run the program on the localhost in Windows:

1. install npm.
2. install from [redis site](https://hub.docker.com/_/redis) the redis image.
3. run Redis image on Docker with the 6379 port.
4. run command `$ node app.js` or `$ npm start` in the program terminal.
5. go to http://localhost:3000 and have fun 😊

• The system enable viewing the characteristics of packages that are on their way to Israel: the display is organized in a district section, and shows a number
Packages along the way and you can also request a graph showing the size distribution and tax billing nature of a particular district.
We built a simulator that simulates a tracking shipments with details of Packages that send to an address in a particular district,
such as: tracking Number, list of items, size (small, large, medium), tax charge etc ..

![image](https://github.com/tehilabk/Big-Data-Cloud-Ecosystems-Project/blob/master/public/images/Israel_sub-districts-HE2.png)

• The simulator simulates scanning packages before sending them to Israel and will update their departure via message. To simulate arrival the simulator will generate
Randomly a QRCODE sticker that will be stored in a cloud storage service.

In the dashboard we will display the information taken from the Redis that run on the Docker.

The data from MongoDB will be taken and saved in a csv file that will be sent to bigML which we will use to create a learning model which will give us the prediction of support and confidence of all items.

![image](https://github.com/tehilabk/Big-Data-Cloud-Ecosystems-Project/blob/master/public/images/bigml.PNG)

• MongoDB (examle):

![image](https://user-images.githubusercontent.com/57085913/126963373-3e81fdf1-60e5-43da-8909-b6264629e12d.png)



