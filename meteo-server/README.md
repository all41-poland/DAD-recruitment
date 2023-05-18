# Mock api for take-home assigment

## Instalation guide

```
Install dependecies
npm install

Start server
npm run start

If you need hot reloading use
npm run start:dev
```

Server is running on port 8000

## API Reference

### Get all reports

```http
  GET /api/reports
```

Response returns all reports:

```
[
	{
		"id": "29242699-5914-4a00-b1ac-1e0113a7a802",
		"temperature": 270,
		"unit": "K",
		"date": "2022-01-01",
		"city": "London"
	},
	{
		"id": "b58798e7-eca4-4bb0-8e93-d595067092c7",
		"temperature": 100,
		"unit": "F",
		"date": "2021-02-11",
		"city": "Los Angeles"
	}
]
```

### Get report by id

```http
  GET /api/reports/${report_id}
```

| Parameter   | Type     | Description                         |
| :---------- | :------- | :---------------------------------- |
| `report_id` | `string` | **Required**. Id of report to fetch |

Response returns report with provided id:

```
{
	"id": "29242699-5914-4a00-b1ac-1e0113a7a802",
	"temperature": 270,
	"unit": "K",
	"date": "2022-01-01",
	"city": "London"
}
```

### Create new report

```http
  POST /api/reports
```

### Body

```
{
    temperature: number;
    unit: string;
    city: string;
    date: string;
}
```

ID is created on serverside  
Response returns all the reports

### Edit existing report

```http
  PUT /api/reports/${report_id}
```

| Parameter   | Type     | Description                         |
| :---------- | :------- | :---------------------------------- |
| `report_id` | `string` | **Required**. Id of report to fetch |

### Body

```
{
    temperature: number;
    unit: string;
    city: string;
    date: string;
}
```

ID is created on serverside  
Response returns all the reports

### Delete report by id

```http
  DELETE /api/reports/${report_id}
```

| Parameter   | Type     | Description                         |
| :---------- | :------- | :---------------------------------- |
| `report_id` | `string` | **Required**. Id of report to fetch |

Response returns message `Report deleted`
