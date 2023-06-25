# Kwikreport
[![Django CI](https://github.com/jerrywonderr/kwikreport/actions/workflows/django.yml/badge.svg)](https://github.com/jerrywonderr/kwikreport/actions/workflows/django.yml)
[![Pylint](https://github.com/jerrywonderr/kwikreport/actions/workflows/pylint.yml/badge.svg)](https://github.com/jerrywonderr/kwikreport/actions/workflows/pylint.yml)
## Introduction
Kwikreport is a simple web app that aims to help weld inspection officers easily
generate a weld inspection report. You can check it out [here](https://kwikreport.vercel.app/), or read the project [Blog article](https://solvit.hashnode.dev/kwikreport-a-report-generation-helper-for-weld-inspection-officers).

Authors of the Project include:
- [Jeremiah Joseph](https://linkedin.com/in/devwonder) - A Full Stack Developer
- [Charles Ezebuike](https://www.linkedin.com/in/charles-ezebuike-98960667/) - A Certified Welding Inspector

Both are currently in the ALX Software Engineering Program, and this project is in fulfillment of one of the many requirements of the program.
## Features
There are a lot of features incoming but we are putting our focus on the MVP for
now. The features we'll be building out in this version includes:
- Account creation and password management (nothing outside that for now under
account management).
- Ability to create, edit and delete reports.
- Ability to allow others view your reports (this will be via the web app).
- Finally, ability to export reports to spreadsheets format and download.
You can view a live demo [here](https://youtu.be/5WjDy7pYqd4).

Other features we intend to implement include:
- adding images to the header of each report
- editing and removing rows/columns
- adding custom validation to the auto-generated form for adding rows
- using a URL shortener for report links
- and much more ...
## Contributing
__**This section is for contributors**__

To start the development server and start working on the app, follow these steps:
1. Clone this repo.
2. Install Poetry, as this is the package manager this project uses.
You can follow this link to install Poetry [docs](https://python-poetry.org/docs/)
3. After successfully installing Poetry, you can optionally setup a virtual environment for development.
> You should run `poetry config virtualenvs.in-project true` to make sure poetry acknowledges the environment
4. Then run `poetry install` to install all dependencies.
5. Then run the `setup-hooks.sh` script to setup all neccessary hooks. **This is important.**
> If you're on windows, you can use git-bash to run that script
6. Finally run `poetry run python3 manage.py runserver`.
## Useful Links
- [Live link](https://kwikreport.vercel.app/)
- [Github link](https://github.com/jerrywonderr/kwikreport)
- [Landing page](https://jerrywonderr.github.io/kwikreport/)
- [Blog article](https://solvit.hashnode.dev/kwikreport-a-report-generation-helper-for-weld-inspection-officers)
