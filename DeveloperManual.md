To install this application, go to the GitHub page and click on the green code button. Under it, go to SSH, copy the SSH-key, and open up Git Bash. Here you would type in the command "git clone (SSH-key)" and it'll then ask you to type in the password you created. Once you're done, you can now open this application in VS Code.

To connect the application to a SupaBase Database, you need to first create a table with columns of data you want to collect and identify the type of data. After the columns have been created, click on the connect button and under the "App Frameworks" tab, you will find the SUPABASE URL and SUPABASE KEY, which you will use to connect the data collected from the project, to the SupaBase Dataset.

To make the connection, in VS Code create a folder and open the terminal. Here you would type the command "npm init" and it'll do a run through of what you want the description to be, author name, etc. Afterwards you should have a package.json file created with the name, version, description, author, etc.

Then in the terminal, install "npm install nodemon", "npm install express", and "npm i body-parser" and these packages will be added. Afterwards, create an index.js file to set up the SupaBase Database and include a ("start": "nodemon -e '\*'",) script within the package.json file. If you type "npm start" in the terminal, you should see it says "App is available on port: 3000".

To test to see if the connection works, type "npm start" in the terminal, open up Insomnia, and create a POST request. For the URL type "http://localhost:300/explorers" and under body, choose the text type as JSON. Here, you can add data to the columns you created in Supabase.
Example:
{
"place": "Canada",
"funFact": "Maple Syrup",
"language": "English"
}
When you click send, you should get a 200 OK and be able to see a preview of the data you just created

Close the "npm start" and install the "npm install @supabase/supabase-js" package and in your index.js file, copy over your SUPABASE URL and SUPABASE Key to initialize it. Open up "npm start" and Insomnia again, but make a GET request with no body instead. Now, when you send the request, you should see something like this in the preview:
{
"id": 1,
"created_at": "2025-12-19T23:23:30.437+00:00",
"explorer_place": "Canada",
"explorer_fun_fact": "Maple Syrup",
"explorer_language": "English"
}
and this means the data has been added into the SupaBase Dataset. From here, you can install any other validators you would like.

Make sure to create a .env with the SUPABASE URL and SUPABASE Key in it and a .gitignore file with the .env file in it.

To have the application available on the server, before deploying the GitHub repository to Vercel, make sure to create a vercel.json file, make a commit and include the SUPABASE URL and SUPABASE Key in the environment variable section. Once it has been deployed, click on the domains link and add /explorers at the end of the url. You should then be able to see that the API is deployed.

Then create a public folder and in it add your HTML, CSS, and JavaScript files. Once you've made all your git commits, you should be able to see the application you created available in Vercel and therefore on the server. Make sure you use the domain link in Vercel and not the deployment link.
