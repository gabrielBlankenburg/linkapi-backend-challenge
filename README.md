# Linkapi Backend Challenge

## Requirements
* An instance of Mongodb running.
* Node v10 or higher.

## Running
1. Clone this repository `git clone https://github.com/gabrielBlankenburg/linkapi-backend-challenge.git`.
2. Create and configure your `.env` file `cp .env.example .env`.
3. Install the dependencies `npm install`.
4. Run the server `npm run dev`.

## The Project
It gets the deals from the Pipedrive API and inserts into the Mongodb and the Bling API.
Since the Pipedrive API supports multiples currencies and the Bling API only supports the Brazilian Real, the server always try to convert the currency to BRL using the [Currency Converter API](https://free.currencyconverterapi.com/) unless the source currency is already BRL.
Notice that the data stored into the mongodb is also converted to BRL.

## Structure

### Clients
Every external request base is created here.

### Controllers
They are responsible for processing the data from the request and returning the http responses.

### Errors
Custom errors so we can handle the exceptions easily with the `handleError` middleware.

### Helpers
Functions that helps with specifics logics as formatters and currency converter.

### Models
The mongoose schemas.

### Services
Handle the logic so the controllers don't get complex.

### Config.js
All the config items from our server. It's mainly filled with the `.env` values.

## Endpoints

### Get Pipedrive Deals
* URL
    - /v1/pipedrive/deals/

* Method
    - GET

* Success Response Sample
    ```json
    [
        {
            "title": "Sapato Importado",
            "value": 20,
            "currency": "USD",
            "won_time": null,
            "company": {
                "name": "Sapataria",
                "email": "blankenburg-sandbox@pipedrivemail.com"
            },
            "contact": {
                "name": "José",
                "emails": [
                    {
                        "label": "work",
                        "value": "jose@test.com",
                        "primary": true
                    },
                    {
                        "label": "work",
                        "value": "outro@test.com",
                        "primary": false
                    }
                ],
                "phone_numbers": [
                    {
                        "label": "work",
                        "value": "555 555 555",
                        "primary": true
                    }
                ]
            }
        },
        {
            "title": "Saia",
            "value": 300,
            "currency": "BRL",
            "won_time": "2020-07-29 23:20:21",
            "company": {
                "name": "Clothes.com",
                "email": "blankenburg-sandbox@pipedrivemail.com"
            },
            "contact": {
                "name": "Maria",
                "emails": [
                    {
                        "value": "",
                        "primary": true
                    }
                ],
                "phone_numbers": [
                    {
                        "value": "",
                        "primary": true
                    }
                ]
            }
        }
    ]
    ```

### Insert the Pipedrive Won Deals into Mongodb and Bling
* URL
    - /v1/pipedrive/deals/sync/

* Method
    - POST

* Success Response Sample
    ```json
    {
        "quantity_order_created": 2
    }
    ```

### Get Orders from Bling
* URL
    - /v1/bling/orders/

* Method
    - GET

* Success Response Sample
    ```json
    [
        {
            "date": "2020-07-29",
            "total_sales": "300.00",
            "customer_name": "Maria",
            "items": [
                {
                    "description": "Saia",
                    "quantity": 1,
                    "unity_value": "300.00"
                }
            ]
        },
    ]
    ```

### Get Orders from Bling
* URL
    - /v1/opportunities/daily-report/

* Method
    - GET

* Success Response Sample
    ```json
    [
        {
            "date": "2020-07-31",
            "total_earning": "200.00",
            "total_sales_number": 1
        },
        {
            "date": "2020-07-29",
            "total_earning": "400.00",
            "total_sales_number": 2
        },
        {
            "date": "2020-07-28",
            "total_earning": "413.61",
            "total_sales_number": 2
        },
        {
            "date": "2020-07-27",
            "total_earning": "200.00",
            "total_sales_number": 1
        }
    ]
    ```
