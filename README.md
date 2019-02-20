# icaros-hytr

# ASSUMTION :
1. Assuming the gid cell size to be 50px, 50px,
2. X axis is from left to right (i.e left most value in 0 and right most value is 10 )
3. Y axis is from Top to bottom (i.e Top most value in 0 and Bottom most value is 10 )
4. The problem states that a python function should be called automatically so I used this approach of building a file watcher to detect the change and print the last added object.(I could have done it completely in node/python).
 

# How to START SERVER and FILE WATCHER

1.Open terminal with backend folder
2.node server.js   // will start node server js on 5000

# Start File watcher
1. Open terminal with backend folder
2. pip install watchdog
3. python pythonScript.py

we are good to GO!!

# Working
1. on very point click it will send a 'GET' request to Node serever with x,y as query params.
2. On node se take those points and append it to current points.csv
3. And there is file watcher listining to the changes in the points.csv file which will print it on the console.
4. Once that is done this node server will check weather the points shited as X+1, Y-1 lines in the 2D plane. If not then it will print the message on console. else it will send the new cordinates to frontend in the response as JSON. From there I can plot the point on the web.    


 
#References
1. https://pythonhosted.org/watchdog/
2. https://api.jquery.com/
3. https://www.w3schools.com/nodejs/


