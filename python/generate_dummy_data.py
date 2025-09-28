import os, random, datetime
from pyairtable import Table
from dotenv import load_dotenv

load_dotenv()

API_KEY = os.environ.get("AIRTABLE_API_KEY")
BASE_ID = os.environ.get("AIRTABLE_BASE_ID")
table_sales = Table(API_KEY, BASE_ID, "Sales")
table_leads = Table(API_KEY, BASE_ID, "Leads")

def random_date(days_back=60):
    d = datetime.datetime.utcnow() - datetime.timedelta(days=random.randint(0, days_back))
    return d.strftime("%Y-%m-%d")   # YYYY-MM-DD

PRODUCTS = ["Basic","Pro","Enterprise"]
SOURCES = ["Website","Email","Referral"]

def gen_sales(n=50):
    for i in range(n):
        table_sales.create({
            "Date": random_date(),
            "Amount": round(random.uniform(10,500),2),
            "Product": random.choice(PRODUCTS),
            "Customer": f"Customer {i}",
            "Source": random.choice(SOURCES)
        })

def gen_leads(n=30):
    statuses = ["New","Contacted","Converted","Lost"]
    for i in range(n):
        table_leads.create({
            "Date": random_date(),
            "Name": f"Lead {i}",
            "Email": f"lead{i}@example.com",
            "Source": random.choice(SOURCES),
            "Status": random.choice(statuses),
            "Notes": ""
        })

if __name__ == "__main__":
    gen_sales(60)
    gen_leads(40)
