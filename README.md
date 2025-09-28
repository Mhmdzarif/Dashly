Dashly
----
Dashly is a real time analytics dashboard that helps companies monitor key performance metrics and automate data aggregation from Airtable. It displays sales, leads, conversion rates, and top products in an easy to read interface.

It integrates using Make.com to automate tasks such as syncing Airtable data, sending notifications, and triggering workflows whenever new sales or leads are added. This ensures KPIs are always current without manual updates.

----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
Features:
----
View total revenue, total leads, conversion rate, and total customers.

Interactive charts for revenue trends and lead breakdown.

Top 5 products by revenue with progress bars.

Automated data fetching and KPI calculations from Airtable.

Automated data updates and workflow triggers using Make.com.

---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
Tech Stack:
----
React – Frontend interface.

Node.js – Backend API for data processing.

Airtable – Cloud database for sales and leads data.

Axios – API requests.

Recharts & MUI – Charts and UI components.

Make.com – Automation of data fetching, notifications, or integrations.

---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
How to Run:
----
1-Clone the repository:
----

git clone https://github.com/Mhmdzarif/Dashly

cd Dashly

----
2-Setup the backend:
--

cd backend

----
3-Install dependencies:
--

npm install

----
4-Start the backend:
--

node server.js

----
5-Setup the frontend (Open a new terminal while keeping the backend's terminal running):
--

cd frontend

----
6-Install dependencies:
--

npm install

----
7-Start the frontend:
--

npm run dev


8-Open the dashboard in your browser at:
--
http://localhost:5173

(note: if you want to add your own airtable database you should add a .env file with you Airtable credentials as follows:)

AIRTABLE_API_KEY=your_api_key  
AIRTABLE_BASE_ID=your_base_id  
PORT=8787

