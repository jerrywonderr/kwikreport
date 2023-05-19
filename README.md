# Kwikreport
## Introduction
Kwikreport is a simple web app that aims to help weld inspection officers easily
generate a weld inspection report.
## Features
There are a lot of features incoming but we are putting our focus on the MVP for
now. The features we'll be building out in this version includes:
- Account creation and password management (nothing outside that for now under
account management).
- Ability to create, edit and delete reports.
- Ability to allow others view your reports (this will be via the web app).
- Finally, ability to export reports to spreadsheets format and download.

More features incoming...
## Contributors
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
3. Finally run `poetry run python3 manage.py runserver`.
