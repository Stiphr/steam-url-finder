Steam ID Availability Checker

This is a simple Node.js script that checks the availability of Steam profile IDs by making requests to the Steam Community API. The script generates random 3 character IDs and checks if they are available. If an ID is available, it is saved to found_urls.txt. The script stops running once the desired number of available IDs have been found.

Prerequisites
Node.js installed on your system
request and fs modules installed

How to use
Clone the repository to your local machine
Install the required modules by running npm install
Run the script by typing node index.js

By default, the script checks for the availability of 1 ID. You can change this value by modifying the targetAmount constant in the script.

If you want the ID to start or end with a hyphen, you can modify the script accordingly. The script generates IDs by randomly selecting characters from the possibleChars string, which can be modified to include or exclude the hyphen character as needed.

The script saves checked IDs to checked_urls.txt, so it won't generate the same ID twice. If you want to start fresh, simply delete the checked_urls.txt file.
