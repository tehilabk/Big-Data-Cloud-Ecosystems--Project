# Tracking Shipments Simulator


-----------------------------------------------------------------------------------------------------

![image](https://github.com/tehilabk/Big-Data-Cloud-Ecosystems-Project/blob/master/public/images/diagram.PNG)



-----------------------------------------------------------------------------------------------------

To run the program on the localhost in Windows:

1. install npm.
2. install from [redis site](https://hub.docker.com/_/redis) the redis image.
3. run Redis image on Docker with the 6379 port.
4. run command `$ npm start` in the program terminal.
5. run command `$ start controler\package_process.js>` in the program terminal.
6. go to  http://localhost:3000/dashboard.ejs and have fun 😊


![image](https://github.com/tehilabk/Big-Data-Cloud-Ecosystems-Project/blob/master/public/images/redis.jpeg)

-----------------------------------------------------------------------------------------------------


## *About:*
### The project is a system which simulates shipment services.
• The system enable viewing the characteristics of packages that are on their way to Israel: the display is organized in a district section, and shows a number
Packages along the way and you can also request a graph showing the size distribution and tax billing nature of a particular district.
We built a simulator that simulates a tracking shipments with details of Packages that send to an address in a particular district,
such as: tracking Number, list of items, size (small, large, medium), tax charge etc ..

![image](https://github.com/tehilabk/Big-Data-Cloud-Ecosystems-Project/blob/master/public/images/Israel_sub-districts-HE2.png)

• The simulator simulates scanning packages before sending them to Israel and will update their departure via message. To simulate arrival the simulator will generate
Randomly a QRCODE sticker that will be stored in a cloud storage service.

![image](https://github.com/tehilabk/Big-Data-Cloud-Ecosystems-Project/blob/master/public/images/qrcode.jpeg)

![image](https://github.com/tehilabk/Big-Data-Cloud-Ecosystems-Project/blob/master/public/images/firebase.jpeg)

In the dashboard we will display the information taken from the Redis that run on the Docker.

The data from MongoDB will be taken and saved in a csv file that will be sent to bigML which we will use to create a learning model which will give us the prediction of support and confidence of all items.

![image](https://github.com/tehilabk/Big-Data-Cloud-Ecosystems-Project/blob/master/public/images/bigml.PNG)


![image](https://github.com/tehilabk/Big-Data-Cloud-Ecosystems-Project/blob/master/public/images/mongo.jpeg)


-----------------------------------------------------------------------------------------------------


HOT-LINE: We'll display the data from Redis' cache in the Dashboard for every package which is departed to it's destination and update that data in Real-time. The Dashboard also includes statistics such as number of packages per country district, charts and graphs of packages' size distribution per district and type of tax billing distribution per district.

COLD-LINE:  The packages' information will also be stored in MongoDB database service as history of all shipments. We'll use the data from MongoDB to generate a unique CSV file which holds only the information about the packages' items, the CSV file will be exported to BigML service in order to generate an Associations Model based on Apriori algorithm for frequent item set mining and association rule learning over relational databases, this model will get us prediction of support and confidence for every item.



