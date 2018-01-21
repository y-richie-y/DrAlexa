# DrAlexa

![alt text](https://www.timeslive.co.za/news/sci-tech/2017-06-19-doctor-robot-will-see-you-now/ )

## Inspiration

Visiting the Doctor makes us uneasy -- it's the clunk of long medical forms, shifting in your seats trying to recall the last time you visited, the long silence when the doctor pulls out your record -- or at least tries to find it for five long minutes before giving up. We wanted to make hospital visits more organic, inviting and natural. Imagine a better conversation between you and the doctor -- no awkward pauses, no fudging facts about your medication, no leaving out stuff you mentioned last session -- because Alexa now remembers everything for you, and participates in the conversation upon request.

"Alexa, what medication is David allergic to again?" "Alexa, what is Sarah's medical history?" "Alexa, what is the status on Chuck's care plan?"

But imagine you're a doctor -- how much more time would you have if you no longer had to scroll through tedious drop-down menus or excel sheets to find information you need?

Doctors today spend more time on paperwork than on patients (link), spending up to two thirds of their time on keeping record and filling out forms (link) -- we want to change that.

Dr Alexa helps you work faster, she keeps you on your train of thought, and she helps you be a better doctor.

## What it does

Working off a database we created to house the dataset (all 1462 entries) on the AWS server. we created a voice-command interface through Alexa so that users (Doctors, Nurses, Hospital Administrators and Patients) can pull up quick facts and query the patient records on command. Dr Alexa can also help users recall a patient's last prescription, compile statistics on most recent causes of death, examine medical procedures executed to keep track of areas of resource expenditure.

## How we built it

First we made a Mongo cluster on AWS to store the dataset provided by TPP. We then used another Nodejs server on AWS to handle REST requests from the Amazon Alexa. In between, we did data analysis on the set to better understand the use cases of the dataset, and to better design the user interface with Alexa.

We then mapped the questions for Alexa into Intents which are converted into Requests using lambda functions in Python; the response from the server is then relayed back into the Echo for speech.

## Challenges we ran into

- Initially, we wanted to create a virtual interface for a seamless user experience. However, due to time constraints, and problems with front and back-end integration, we have decided to focus on our main feature -- the voice enabled assistant. A lot of code had to be deleted, ignored or re-coded -- and as much as that was heartbreaking -- our product was ultimately streamlined and refined.
Accomplishments that we're proud of

- Mongo Cluster (which we experimented with to understand the data set; we conducted data analysis to glean insights which we can program Intents for via Alexa)

- Build Scripts to automate the process for Node.js servers

- Because REST is fundamentally stateless, we had to be clever with our message passing so that the Echo can understand contextual questions (e.g someone is here, what are her allergies, what was his medication)
What we learned

Hackathons are equal parts fulfilling and frustrating

## What's next for Dr. Alexa

In addition to our current dataset, we hope to integrate Dr. Alexa with more databases to increase her functionalities. We hope to be able to command Dr. Alexa to crosscheck patient for clinical trail suitability; we hope Dr. Alexa can suggest research papers for Doctors to read on tricky and niche diagnosis; we hope Dr. Alexa can help update the system, schedule appointments, book radiology screenings, redirect questions to other doctors (from across the globe) through oral dictation as well. Imagine a seamless medical assistant with the power of diagnostic databases, research journals, comprehensive patient records and live outbreak statistics.

