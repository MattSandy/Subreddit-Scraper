Subreddit Scraper
=================

This console app was designed to collect information for subbreddit posts and users to analyze patterns within Reddit’s user base. It stores the information in two CSVs, one for the submissions and one for the users.

### posts.csv

| Author            | ID          | Post Date     | Comments               | Score                        | Stickied              | Pull                              | Subreddit     |
|-------------------|-------------|---------------|------------------------|------------------------------|-----------------------|-----------------------------------|---------------|
| The Author's name | The Post ID | The Post Date | The Number of Comments | The Score for the Submission | true/false if sticked | The sorting method (coded to hot) | The Subreddit |

### users.csv

| Author   | Author Date               |
|----------|---------------------------|
| Username | Date the User was Created |

Running the App
---------------

```sh
node app.js
```

