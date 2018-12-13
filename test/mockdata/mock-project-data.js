export const MockProjectData = [
  {
    "organization": "fedspendingtransparency",
    "organizationUrl": "https://github.com/fedspendingtransparency",
    "organizationType": "Organization",
    "organizationAvatarUrl": "https://avatars0.githubusercontent.com/u/8397762?v=4",
    "origin": "PUBLIC",
    "project_name": "usaspending-api",
    "full_name": "fedspendingtransparency/usaspending-api",
    "project_description": "An RESTful API for U.S. federal spending data.",
    "repository": "usaspending-api",
    "forkedRepos": [
      {
        "id": "20936553_151664610",
        "name": "usaspending-api",
        "org_name": "workexpress"
      },
      {
        "id": "2808553_149046414",
        "name": "usaspending-api",
        "org_name": "mikepsinn"
      },
      {
        "id": "33761454_144719257",
        "name": "usaspending-api",
        "org_name": "social-labs"
      },
      {
        "id": "3523590_143456275",
        "name": "usaspending-api",
        "org_name": "kumar116"
      },
      {
        "id": "7486845_136829775",
        "name": "usaspending-api",
        "org_name": "animatecitizen"
      },
      {
        "id": "14617535_136317864",
        "name": "usaspending-api",
        "org_name": "wmidcap"
      },
      {
        "id": "9705435_133721683",
        "name": "usaspending-api",
        "org_name": "kristen178"
      },
      {
        "id": "25860582_132200475",
        "name": "usaspending-api",
        "org_name": "pebsconsulting"
      },
      {
        "id": "36206488_131920238",
        "name": "usaspending-api",
        "org_name": "fullstackenviormentss"
      },
      {
        "id": "37606425_130640821",
        "name": "usaspending-api",
        "org_name": "flyntrudolph"
      },
      {
        "id": "5560013_127936577",
        "name": "usaspending-api",
        "org_name": "ee-in"
      },
      {
        "id": "434063_126243167",
        "name": "usaspending-api",
        "org_name": "nickcannariato"
      },
      {
        "id": "8854444_126040481",
        "name": "usaspending-api",
        "org_name": "miahunsicker"
      },
      {
        "id": "9831081_125413587",
        "name": "usaspending-api",
        "org_name": "russellbodine"
      },
      {
        "id": "1195051_124310602",
        "name": "usaspending-api",
        "org_name": "mtomic"
      },
      {
        "id": "540544_123736523",
        "name": "usaspending-api",
        "org_name": "bsweger"
      },
      {
        "id": "76945_105155363",
        "name": "usaspending-api",
        "org_name": "vitorbaptista"
      },
      {
        "id": "1623538_97207566",
        "name": "usaspending-api",
        "org_name": "CNXTEoEorg"
      },
      {
        "id": "29930650_97053183",
        "name": "usaspending-api",
        "org_name": "codestaruser"
      },
      {
        "id": "124687_89357803",
        "name": "usaspending-api",
        "org_name": "toolness"
      },
      {
        "id": "16655897_87962750",
        "name": "usaspending-api",
        "org_name": "aprilosajima"
      },
      {
        "id": "8447158_85416008",
        "name": "usaspending-api",
        "org_name": "JLaws0n"
      },
      {
        "id": "10538364_85086463",
        "name": "usaspending-api",
        "org_name": "janellebecker"
      },
      {
        "id": "25255828_79602368",
        "name": "usaspending-api",
        "org_name": "klingerf2"
      },
      {
        "id": "24708446_77104714",
        "name": "usaspending-api",
        "org_name": "joshuaeveleth"
      },
      {
        "id": "24689290_77014444",
        "name": "usaspending-api",
        "org_name": "govtmirror"
      },
      {
        "id": "305137_76749990",
        "name": "usaspending-api",
        "org_name": "jeveleth"
      },
      {
        "id": "17499241_75171017",
        "name": "usaspending-api",
        "org_name": "mjemio"
      },
      {
        "id": "21678787_67641054",
        "name": "usaspending-api",
        "org_name": "ravulapallia-bah"
      }
    ],
    "commits": 7592,
    "language": "Python",
    "languages": {
      "CSS": "181256",
      "Dockerfile": "811",
      "HTML": "9580",
      "JavaScript": "8040",
      "PLSQL": "7276",
      "PLpgSQL": "178724",
      "Python": "2452564"
    },
    "content": "# <p align=\"center\"><img src=\"https://www.usaspending.gov/img/logo@2x.png\" alt=\"USAspending API\"></p>\n\n[![Build Status](https://travis-ci.org/fedspendingtransparency/usaspending-api.svg?branch=master)](https://travis-ci.org/fedspendingtransparency/usaspending-api) [![Test Coverage](https://codeclimate.com/github/fedspendingtransparency/usaspending-api/badges/coverage.svg)](https://codeclimate.com/github/fedspendingtransparency/usaspending-api/coverage) [![Code Climate](https://codeclimate.com/github/fedspendingtransparency/usaspending-api/badges/gpa.svg)](https://codeclimate.com/github/fedspendingtransparency/usaspending-api)\n\n_This API is utilized by USAspending.gov to obtain all federal spending data which is open source and provided to the public as part of the DATA Act._\n\n![USAspending Landing Page](readme.jpg?raw=true \"Readme\")\n\n## Install\n\nEnsure the following dependencies are installed and working prior to continuing:\n\n### Requirements\n- [`python3`](https://docs.python-guide.org/starting/installation/#python-3-installation-guides)\n- [`pyenv`](https://github.com/pyenv/pyenv/#installation) using Python 3.5.x\n  - _NOTE: Read full install. `brew install` needs to be followed by additional steps to modify and source your `~/.bash_profile`_\n- [`PostgreSQL`](https://www.postgresql.org/download/) 10.x (with a dedicated `data_store_api` database)\n- [`direnv`](https://github.com/direnv/direnv#install)\n  - For Mac OSX, be sure to put the hook in your `~/.bash_profile`, not `~/.bashrc`\n- `Bash` or another Unix Shell equivalent\n  - Bash is available on Windows as [Windows Subsystem for Linux](https://docs.microsoft.com/en-us/windows/wsl/install-win10)\n- Command line package manager\n  - Windows' WSL bash uses `apt-get`\n  - OSX users will use [`Homebrew`](https://brew.sh/)\n\n### Setup\nNavigate to the base file directory for the USAspending repositories\n\n    $ mkdir -p usaspending && cd usaspending\n    $ git clone https://github.com/fedspendingtransparency/usaspending-api.git\n    $ cd usaspending-api\n\nCreate and activate the virtual environment using `venv`, and ensure the right version of Python 3.5.x is being used (the latest RHEL package available for `python35u`, currently 3.5.5)\n\n    $ pyenv install 3.5.5\n    $ pyenv local 3.5.5\n    $ python -m venv .venv/usaspending-api\n    $ source .venv/usaspending-api/bin/activate\n\n\nYour prompt should then look as below to show you are _in_ the virtual environment named `usaspending-api` (_to exit that virtual environment, simply type `deactivate` at the prompt_).\n\n    (usaspending-api) $ \n\n[`pip`](https://pip.pypa.io/en/stable/installing/) `install` application dependencies\n\n:bulb: _(try a different WiFi if you're current one blocks dependency downloads)_\n\n    (usaspending-api) $ pip install -r requirements/requirements.txt\n\nSet environment variables (fill in the connection string placeholders, e.g. `USER`, `PASSWORD`, `HOST`, `PORT`)\n*note: default port for PostgreSQL is `5432`\n\n```shell\n\n(usaspending-api) $ echo \"export DATABASE_URL='postgres://USER:PASSWORD@HOST:PORT/data_store_api'\" >> .envrc\n\n```\n\nTest the database connection and upate the `data_store_api` schema\n\n    (usaspending-api) $ ./manage.py migrate\n\nStart up the site\n\n    (usaspending-api) $ ./manage.py runserver\n\nThe application will be available at `http://localhost:8000`\n\n## API\n\nIn your local development environment, available API endpoints may be found at `http://localhost:8000/docs/endpoints`\n\nDeployed production API endpoints and docs are found by following links here: `https://api.usaspending.gov`\n\n## Loading Data\n\nFor details on loading reference data, DATA Act Broker submissions, and current USAspending data into the API, see [loading_data.md](loading_data.md).\n\nFor details on how our data loaders modify incoming data, see [data_changes.md](data_changes.md).\n\n## Public Domain License\n\nThis project is in the public domain within the United States, and copyright and related rights in the work worldwide are waived through the CC0 1.0 Universal public domain dedication.\n\nAll contributions to this project will be released under the CC0 dedication. By submitting a pull request, you are agreeing to comply with this waiver of copyright interest.\n",
    "contributors": 33,
    "contributors_list": [
      {
        "avatar_url": "https://avatars2.githubusercontent.com/u/16244012?v=4",
        "profile_url": "https://github.com/nmonga91",
        "user_type": "User",
        "username": "nmonga91"
      },
      {
        "avatar_url": "https://avatars1.githubusercontent.com/u/22781949?v=4",
        "profile_url": "https://github.com/tony-sappe",
        "user_type": "User",
        "username": "tony-sappe"
      },
      {
        "avatar_url": "https://avatars2.githubusercontent.com/u/29313570?v=4",
        "profile_url": "https://github.com/dpb-bah",
        "user_type": "User",
        "username": "dpb-bah"
      },
      {
        "avatar_url": "https://avatars2.githubusercontent.com/u/6662582?v=4",
        "profile_url": "https://github.com/afrasier",
        "user_type": "User",
        "username": "afrasier"
      },
      {
        "avatar_url": "https://avatars2.githubusercontent.com/u/1631162?v=4",
        "profile_url": "https://github.com/willkjackson",
        "user_type": "User",
        "username": "willkjackson"
      },
      {
        "avatar_url": "https://avatars0.githubusercontent.com/u/208054?v=4",
        "profile_url": "https://github.com/catherinedevlin",
        "user_type": "User",
        "username": "catherinedevlin"
      },
      {
        "avatar_url": "https://avatars0.githubusercontent.com/u/9831081?v=4",
        "profile_url": "https://github.com/russellbodine",
        "user_type": "User",
        "username": "russellbodine"
      },
      {
        "avatar_url": "https://avatars3.githubusercontent.com/u/4614454?v=4",
        "profile_url": "https://github.com/michaeldhess",
        "user_type": "User",
        "username": "michaeldhess"
      },
      {
        "avatar_url": "https://avatars2.githubusercontent.com/u/540544?v=4",
        "profile_url": "https://github.com/bsweger",
        "user_type": "User",
        "username": "bsweger"
      },
      {
        "avatar_url": "https://avatars3.githubusercontent.com/u/5183500?v=4",
        "profile_url": "https://github.com/shinson",
        "user_type": "User",
        "username": "shinson"
      },
      {
        "avatar_url": "https://avatars0.githubusercontent.com/u/3599046?v=4",
        "profile_url": "https://github.com/IsaacRay",
        "user_type": "User",
        "username": "IsaacRay"
      },
      {
        "avatar_url": "https://avatars2.githubusercontent.com/u/11461802?v=4",
        "profile_url": "https://github.com/alburde1",
        "user_type": "User",
        "username": "alburde1"
      },
      {
        "avatar_url": "https://avatars0.githubusercontent.com/u/10401786?v=4",
        "profile_url": "https://github.com/phroiland",
        "user_type": "User",
        "username": "phroiland"
      },
      {
        "avatar_url": "https://avatars3.githubusercontent.com/u/15107933?v=4",
        "profile_url": "https://github.com/playmakervi",
        "user_type": "User",
        "username": "playmakervi"
      },
      {
        "avatar_url": "https://avatars1.githubusercontent.com/u/4858967?v=4",
        "profile_url": "https://github.com/justinle",
        "user_type": "User",
        "username": "justinle"
      },
      {
        "avatar_url": "https://avatars2.githubusercontent.com/u/8854444?v=4",
        "profile_url": "https://github.com/miahunsicker",
        "user_type": "User",
        "username": "miahunsicker"
      },
      {
        "avatar_url": "https://avatars0.githubusercontent.com/u/12663957?v=4",
        "profile_url": "https://github.com/MelvinDunn",
        "user_type": "User",
        "username": "MelvinDunn"
      },
      {
        "avatar_url": "https://avatars1.githubusercontent.com/u/14953413?v=4",
        "profile_url": "https://github.com/kwhickey",
        "user_type": "User",
        "username": "kwhickey"
      },
      {
        "avatar_url": "https://avatars0.githubusercontent.com/u/13200616?v=4",
        "profile_url": "https://github.com/klrBAH",
        "user_type": "User",
        "username": "klrBAH"
      },
      {
        "avatar_url": "https://avatars3.githubusercontent.com/u/75555?v=4",
        "profile_url": "https://github.com/kaitlin",
        "user_type": "User",
        "username": "kaitlin"
      },
      {
        "avatar_url": "https://avatars2.githubusercontent.com/u/1122643?v=4",
        "profile_url": "https://github.com/annalee",
        "user_type": "User",
        "username": "annalee"
      },
      {
        "avatar_url": "https://avatars1.githubusercontent.com/u/32879513?v=4",
        "profile_url": "https://github.com/dylanbah",
        "user_type": "User",
        "username": "dylanbah"
      },
      {
        "avatar_url": "https://avatars2.githubusercontent.com/u/16707705?v=4",
        "profile_url": "https://github.com/alexjajabah",
        "user_type": "User",
        "username": "alexjajabah"
      },
      {
        "avatar_url": "https://avatars2.githubusercontent.com/u/4449046?v=4",
        "profile_url": "https://github.com/mab6bf",
        "user_type": "User",
        "username": "mab6bf"
      },
      {
        "avatar_url": "https://avatars2.githubusercontent.com/u/21318312?v=4",
        "profile_url": "https://github.com/edshields",
        "user_type": "User",
        "username": "edshields"
      },
      {
        "avatar_url": "https://avatars3.githubusercontent.com/u/3594363?v=4",
        "profile_url": "https://github.com/kevinli-work",
        "user_type": "User",
        "username": "kevinli-work"
      },
      {
        "avatar_url": "https://avatars0.githubusercontent.com/u/33040859?v=4",
        "profile_url": "https://github.com/hsharma96",
        "user_type": "User",
        "username": "hsharma96"
      },
      {
        "avatar_url": "https://avatars0.githubusercontent.com/u/1611446?v=4",
        "profile_url": "https://github.com/namkyux",
        "user_type": "User",
        "username": "namkyux"
      },
      {
        "avatar_url": "https://avatars0.githubusercontent.com/u/16239342?v=4",
        "profile_url": "https://github.com/pyup-bot",
        "user_type": "User",
        "username": "pyup-bot"
      },
      {
        "avatar_url": "https://avatars2.githubusercontent.com/u/124687?v=4",
        "profile_url": "https://github.com/toolness",
        "user_type": "User",
        "username": "toolness"
      },
      {
        "avatar_url": "https://avatars1.githubusercontent.com/u/43386699?v=4",
        "profile_url": "https://github.com/kbard",
        "user_type": "User",
        "username": "kbard"
      },
      {
        "avatar_url": "https://avatars1.githubusercontent.com/u/76945?v=4",
        "profile_url": "https://github.com/vitorbaptista",
        "user_type": "User",
        "username": "vitorbaptista"
      },
      {
        "avatar_url": "https://avatars2.githubusercontent.com/u/256019?v=4",
        "profile_url": "https://github.com/dfrasier",
        "user_type": "User",
        "username": "dfrasier"
      }
    ],
    "stars": 81,
    "watchers": 34,
    "releases": 0,
    "rank": 8136,
    "repositoryUrl": "https://github.com/fedspendingtransparency/usaspending-api",
    "updatedAt": "2018-11-07T15:31:09Z",
    "id": "8397762_65394827",
    "downloads": 10
  },
  {
    "organization": "fedspendingtransparency",
    "organizationUrl": "https://github.com/fedspendingtransparency",
    "organizationType": "Organization",
    "organizationAvatarUrl": "https://avatars0.githubusercontent.com/u/8397762?v=4",
    "origin": "PUBLIC",
    "project_name": "data-act-broker-backend",
    "full_name": "fedspendingtransparency/data-act-broker-backend",
    "project_description": "Services that power the DATA Act's central data submission platform",
    "repository": "data-act-broker-backend",
    "forkedRepos": [
      {
        "id": "18203426_142224625",
        "name": "data-act-broker-backend",
        "org_name": "DavidLAndrews"
      },
      {
        "id": "14617535_118152305",
        "name": "data-act-broker-backend",
        "org_name": "wmidcap"
      },
      {
        "id": "14131597_114405890",
        "name": "data-act-broker-backend",
        "org_name": "adolfoeliazat"
      },
      {
        "id": "8258345_108847950",
        "name": "data-act-broker-backend",
        "org_name": "mjmanoj"
      },
      {
        "id": "22781949_102654471",
        "name": "data-act-broker-backend",
        "org_name": "tony-sappe"
      },
      {
        "id": "17285438_101907429",
        "name": "data-act-broker-backend",
        "org_name": "ross-williford"
      },
      {
        "id": "1623538_97207370",
        "name": "data-act-broker-backend",
        "org_name": "CNXTEoEorg"
      },
      {
        "id": "29701489_95604052",
        "name": "data-act-broker-backend",
        "org_name": "sensecollective"
      },
      {
        "id": "13103559_86161635",
        "name": "data-act-broker-backend",
        "org_name": "nibirunemisis"
      },
      {
        "id": "6524079_79825655",
        "name": "data-act-broker-backend",
        "org_name": "jstvssr"
      },
      {
        "id": "25255828_79602364",
        "name": "data-act-broker-backend",
        "org_name": "klingerf2"
      },
      {
        "id": "16297596_77238534",
        "name": "data-act-broker-backend",
        "org_name": "alaakh42"
      },
      {
        "id": "24708446_77104709",
        "name": "data-act-broker-backend",
        "org_name": "joshuaeveleth"
      },
      {
        "id": "24689290_77014441",
        "name": "data-act-broker-backend",
        "org_name": "govtmirror"
      },
      {
        "id": "305137_76749988",
        "name": "data-act-broker-backend",
        "org_name": "jeveleth"
      },
      {
        "id": "6578161_74174790",
        "name": "data-act-broker-backend",
        "org_name": "JerJohn15"
      },
      {
        "id": "131426_73655682",
        "name": "data-act-broker-backend",
        "org_name": "brunsa2"
      },
      {
        "id": "742350_73112060",
        "name": "data-act-broker-backend",
        "org_name": "us1415"
      },
      {
        "id": "21317786_70625387",
        "name": "data-act-broker-backend",
        "org_name": "chambers-brian"
      },
      {
        "id": "16667780_62075776",
        "name": "data-act-broker-backend",
        "org_name": "lisaam"
      }
    ],
    "commits": 6600,
    "language": "Python",
    "languages": {
      "Dockerfile": "456",
      "Mako": "923",
      "PLSQL": "2883",
      "PLpgSQL": "27125",
      "Python": "2521771",
      "Shell": "70"
    },
    "content": "# DATA Act Broker Backend\n\nThe DATA Act Broker backend is a collection of services that power the DATA Act's central data submission platform.\n\nThe website that runs on these services is here: [https://broker.usaspending.gov/](https://broker.usaspending.gov/ \"DATA Act Broker website\").\n\n## Background\n\nThe U.S. Department of the Treasury is building a suite of open-source tools to help federal agencies comply with the [DATA Act](http://fedspendingtransparency.github.io/about/ \"Federal Spending Transparency Background\") and to deliver the resulting standardized federal spending information back to agencies and to the public.\n\nOne of these tools is the DATA Act Broker. The Broker ingests federal spending data from agency award and financial systems, validates it, and standardizes it against the [common DATA Act model](http://fedspendingtransparency.github.io/data-model/ \"data model\"). Treasury will make a hosted version of the Broker freely available to agencies. Alternately, agencies can take this code and run the Broker locally.\n\nThe Broker contains:\n\n* **The [DATA Act core](dataactcore/ \"DATA Act core\"):** common models and services used by the Broker\n* **The [Broker's application programming interface (API)](dataactbroker/ \"DATA Act Broker API\"):** data submission API\n* **The [DATA Act validator](dataactvalidator/ \"DATA Act Validator\"):** data validation service\n* **The [Broker website](https://github.com/fedspendingtransparency/data-act-broker-web-app \"DATA Act Broker website\"):** data submission and reporting website powered by the above\n\nThe first three items compose the Broker's backend and are maintained in this repository. For details about any of the above, please follow the links to their individual README files.\n\n## Using the DATA Act Broker\n\n### Using Treasury's Hosted Broker\n\nIf you're from a federal agency that will use Treasury's hosted DATA Act broker, you can probably stop reading here. Instead, visit the [Broker's website](https://broker.usaspending.gov/ \"DATA Act Broker\") to request a user account.\n\n### Installing the Broker Locally\n\nIf you want to install the software on your own machine, follow the instructions on our DATA Broker [install guide](doc/INSTALL.md \"INSTALL.md\").\n",
    "contributors": 26,
    "contributors_list": [
      {
        "avatar_url": "https://avatars2.githubusercontent.com/u/11461802?v=4",
        "profile_url": "https://github.com/alburde1",
        "user_type": "User",
        "username": "alburde1"
      },
      {
        "avatar_url": "https://avatars2.githubusercontent.com/u/11858333?v=4",
        "profile_url": "https://github.com/jworcestBAH",
        "user_type": "User",
        "username": "jworcestBAH"
      },
      {
        "avatar_url": "https://avatars2.githubusercontent.com/u/540544?v=4",
        "profile_url": "https://github.com/bsweger",
        "user_type": "User",
        "username": "bsweger"
      },
      {
        "avatar_url": "https://avatars3.githubusercontent.com/u/4614454?v=4",
        "profile_url": "https://github.com/michaeldhess",
        "user_type": "User",
        "username": "michaeldhess"
      },
      {
        "avatar_url": "https://avatars2.githubusercontent.com/u/16244012?v=4",
        "profile_url": "https://github.com/nmonga91",
        "user_type": "User",
        "username": "nmonga91"
      },
      {
        "avatar_url": "https://avatars2.githubusercontent.com/u/29313570?v=4",
        "profile_url": "https://github.com/dpb-bah",
        "user_type": "User",
        "username": "dpb-bah"
      },
      {
        "avatar_url": "https://avatars0.githubusercontent.com/u/13200616?v=4",
        "profile_url": "https://github.com/klrBAH",
        "user_type": "User",
        "username": "klrBAH"
      },
      {
        "avatar_url": "https://avatars0.githubusercontent.com/u/4334164?v=4",
        "profile_url": "https://github.com/kim-minahm",
        "user_type": "User",
        "username": "kim-minahm"
      },
      {
        "avatar_url": "https://avatars0.githubusercontent.com/u/4643648?v=4",
        "profile_url": "https://github.com/mtpress",
        "user_type": "User",
        "username": "mtpress"
      },
      {
        "avatar_url": "https://avatars3.githubusercontent.com/u/22891177?v=4",
        "profile_url": "https://github.com/kkuratsu",
        "user_type": "User",
        "username": "kkuratsu"
      },
      {
        "avatar_url": "https://avatars3.githubusercontent.com/u/5183500?v=4",
        "profile_url": "https://github.com/shinson",
        "user_type": "User",
        "username": "shinson"
      },
      {
        "avatar_url": "https://avatars0.githubusercontent.com/u/3599046?v=4",
        "profile_url": "https://github.com/IsaacRay",
        "user_type": "User",
        "username": "IsaacRay"
      },
      {
        "avatar_url": "https://avatars2.githubusercontent.com/u/4449046?v=4",
        "profile_url": "https://github.com/mab6bf",
        "user_type": "User",
        "username": "mab6bf"
      },
      {
        "avatar_url": "https://avatars2.githubusercontent.com/u/326918?v=4",
        "profile_url": "https://github.com/cmc333333",
        "user_type": "User",
        "username": "cmc333333"
      },
      {
        "avatar_url": "https://avatars2.githubusercontent.com/u/1631162?v=4",
        "profile_url": "https://github.com/willkjackson",
        "user_type": "User",
        "username": "willkjackson"
      },
      {
        "avatar_url": "https://avatars3.githubusercontent.com/u/75555?v=4",
        "profile_url": "https://github.com/kaitlin",
        "user_type": "User",
        "username": "kaitlin"
      },
      {
        "avatar_url": "https://avatars0.githubusercontent.com/u/654722?v=4",
        "profile_url": "https://github.com/kyle-fox",
        "user_type": "User",
        "username": "kyle-fox"
      },
      {
        "avatar_url": "https://avatars0.githubusercontent.com/u/33040859?v=4",
        "profile_url": "https://github.com/hsharma96",
        "user_type": "User",
        "username": "hsharma96"
      },
      {
        "avatar_url": "https://avatars0.githubusercontent.com/u/12633241?v=4",
        "profile_url": "https://github.com/sharb",
        "user_type": "User",
        "username": "sharb"
      },
      {
        "avatar_url": "https://avatars2.githubusercontent.com/u/928957?v=4",
        "profile_url": "https://github.com/EricSchles",
        "user_type": "User",
        "username": "EricSchles"
      },
      {
        "avatar_url": "https://avatars0.githubusercontent.com/u/14811261?v=4",
        "profile_url": "https://github.com/ashikbanjade",
        "user_type": "User",
        "username": "ashikbanjade"
      },
      {
        "avatar_url": "https://avatars2.githubusercontent.com/u/6662582?v=4",
        "profile_url": "https://github.com/afrasier",
        "user_type": "User",
        "username": "afrasier"
      },
      {
        "avatar_url": "https://avatars1.githubusercontent.com/u/14953413?v=4",
        "profile_url": "https://github.com/kwhickey",
        "user_type": "User",
        "username": "kwhickey"
      },
      {
        "avatar_url": "https://avatars3.githubusercontent.com/u/3594363?v=4",
        "profile_url": "https://github.com/kevinli-work",
        "user_type": "User",
        "username": "kevinli-work"
      },
      {
        "avatar_url": "https://avatars0.githubusercontent.com/u/11528424?v=4",
        "profile_url": "https://github.com/bahfolkoff",
        "user_type": "User",
        "username": "bahfolkoff"
      },
      {
        "avatar_url": "https://avatars1.githubusercontent.com/u/22781949?v=4",
        "profile_url": "https://github.com/tony-sappe",
        "user_type": "User",
        "username": "tony-sappe"
      }
    ],
    "stars": 30,
    "watchers": 27,
    "releases": 0,
    "rank": 6928,
    "repositoryUrl": "https://github.com/fedspendingtransparency/data-act-broker-backend",
    "updatedAt": "2018-11-07T16:53:33Z",
    "id": "8397762_57313310",
    "downloads": 10
  },
  {
    "organization": "fedspendingtransparency",
    "organizationUrl": "https://github.com/fedspendingtransparency",
    "organizationType": "Organization",
    "organizationAvatarUrl": "https://avatars0.githubusercontent.com/u/8397762?v=4",
    "origin": "PUBLIC",
    "project_name": "usaspending-website",
    "full_name": "fedspendingtransparency/usaspending-website",
    "project_description": "Web application for U.S. federal spending data",
    "repository": "usaspending-website",
    "forkedRepos": [
      {
        "id": "23030160_154926272",
        "name": "usaspending-website",
        "org_name": "KulieX"
      },
      {
        "id": "2808553_149052009",
        "name": "usaspending-website",
        "org_name": "mikepsinn"
      },
      {
        "id": "22462463_144432158",
        "name": "usaspending-website",
        "org_name": "afcarl"
      },
      {
        "id": "25860582_132204696",
        "name": "usaspending-website",
        "org_name": "pebsconsulting"
      },
      {
        "id": "36206488_131921546",
        "name": "usaspending-website",
        "org_name": "fullstackenviormentss"
      },
      {
        "id": "3594363_126025742",
        "name": "usaspending-website",
        "org_name": "kevinli-work"
      },
      {
        "id": "5668806_122830046",
        "name": "usaspending-website",
        "org_name": "WooodHead"
      },
      {
        "id": "16494852_119081831",
        "name": "usaspending-website",
        "org_name": "michals2"
      },
      {
        "id": "29791463_118663391",
        "name": "usaspending-website",
        "org_name": "fossabot"
      },
      {
        "id": "240379_110722876",
        "name": "usaspending-website",
        "org_name": "blencorp"
      },
      {
        "id": "20543145_108011588",
        "name": "usaspending-website",
        "org_name": "davidewarren"
      },
      {
        "id": "928957_100274651",
        "name": "usaspending-website",
        "org_name": "EricSchles"
      },
      {
        "id": "1623538_97207293",
        "name": "usaspending-website",
        "org_name": "CNXTEoEorg"
      },
      {
        "id": "382183_91480869",
        "name": "usaspending-website",
        "org_name": "fulldecent"
      },
      {
        "id": "1096343_90956641",
        "name": "usaspending-website",
        "org_name": "elubdynasty"
      },
      {
        "id": "10016577_90765580",
        "name": "usaspending-website",
        "org_name": "wslack"
      },
      {
        "id": "25255828_79602365",
        "name": "usaspending-website",
        "org_name": "klingerf2"
      },
      {
        "id": "24708446_77104712",
        "name": "usaspending-website",
        "org_name": "joshuaeveleth"
      },
      {
        "id": "24689290_77014443",
        "name": "usaspending-website",
        "org_name": "govtmirror"
      },
      {
        "id": "305137_76749989",
        "name": "usaspending-website",
        "org_name": "jeveleth"
      }
    ],
    "commits": 3996,
    "language": "JavaScript",
    "languages": {
      "CSS": "525040",
      "Dockerfile": "189",
      "HTML": "5246",
      "JavaScript": "3312247"
    },
    "content": "# USAspending Website\n\n[![Build Status](https://travis-ci.org/fedspendingtransparency/usaspending-website.svg?branch=dev)](https://travis-ci.org/fedspendingtransparency/usaspending-website) [![Test Coverage](https://codeclimate.com/github/fedspendingtransparency/usaspending-website/badges/coverage.svg)](https://codeclimate.com/github/fedspendingtransparency/usaspending-website/coverage)\n\n[The USAspending website](https://beta.usaspending.gov/) is the public-facing site offering information on Government spending for the United States.\n\n## Development Set Up\n\nTo stand up a local copy of the USAspending website, follow the directions below.\n\nAssumptions:\n\n* You're able to install software on your machine.\n* You have git installed on your machine and are able to clone code repositories from GitHub. If this isn't the case, the easiest way to get started is to install [GitHub Desktop](https://desktop.github.com/ \"GitHub desktop\"), available for Windows or Mac.\n* You're familiar with opening a terminal on your machine and using the command line as needed.\n\n\n### Install Prerequisites and Code\n\n1. If you're not already running Node.js, download and run the installer for your operating system. We build using **Node.js 6.11.x (LTS)**: [https://nodejs.org/en/](https://nodejs.org/en/ \"Node.js installer\").\n\n2. You should also have *npm* (Node's package manager). This is typically included as part of the Node.js install. We use version 3.10.x. This is used to install the software dependencies the web site and the build system require.\n\n3. From the command line, clone the USAspending website repository from GitHub to your local machine:\n\n        $ git clone https://github.com/fedspendingtransparency/usaspending-website.git\n\n4. Change to the `usaspending-website` directory that was created when you cloned the USAspending Website repository.\n\n5. Install the web application's package dependencies:\n\n        $ npm install\n\n\n### Create Configurations\n\nThe `usaspending-website` folder provides three sample `GlobalConstants` files:\n\n * `sampleGlobalConstants_dev.js`\n * `sampleGlobalConstants_prod.js`.\n\nUse these sample files to create files named `GlobalConstants_dev.js` and `GlobalConstants_prod.js` respectively.\n\nYou **must** have *both* `GlobalConstants_dev.js` and `GlobalConstants_prod.js` created before building the application. \n\nThe sample files require you to provide values for:\n\n* `API` (string) is the base API URL for the server that is hosting the API.\n\t* The USAspending API is located at `https://api.usaspending.gov/api/`, with the trailing slash included.\n* `DEV` (boolean) indicates if you are running the application in development mode or for production use. Enabling development mode activates certain debugging functionality at the expense of some performance.\n* `PERF_LOG` (boolean) indicates if you want to enable performance logging data in the JavaScript console. This requires `DEV` to be enabled as well.\n\n`DEV` and `PERF_LOG` should be disabled when deploying to a hosted public, staging, or production environment.\n\n**TIP!** You can use separate `GlobalConstants_dev.js` and `GlobalConstants_prod.js` files to point to different API endpoints that align with different environments.\n\n### Build Application\n\nSeveral Webpack configurations are available to build the frontend web site for various use cases.\n\n#### Hosted Production\n\nIf you are building the web site for a hosted production environment, run:\n\n```bash\n\t$ npm run prod\n```\nThis will build the frontend files to the `/public` directory, which you can then deploy on your host. In this mode, JavaScript files are minified, debugging tools are disabled, and the `GlobalConstants_prod.js` file is used as the GlobalConstants file.\n\n#### Local Development\n\nFinally, if you are a frontend developer, use:\n\n```bash\n\t$ npm start\n```\n\nThis will build the frontend files to the `/public` directory and also start a web server on port 3000. In this mode, JavaScript files are uncompressed and sourcemapped, debugging tools are enabled and the `GlobalConstants_dev.js` file is used as the GlobalConstants file. Additionally, SASS files in the `/src/_scss` and `/src/css` folders are watched, along with JS files in the `/src/js` folder, and these files are recompiled (and the browser automatically refreshed) whenever a change is detected.\n\nThis mode also differs from `production` by using incremental Webpack builds. This means that the code is recompiled every time a change is detected in a source JS/JSX file, but the builds are *incremental*, meaning they take significantly less time than a complete build by recycling compiled code for unmodified parts. When making changes to the source code, you should always develop in `dev` mode to take advantage of this feature.\n\n#### Running Tests\n\nTo run the automated test suite, run `npm test`.\n\n#### Additional Configurations\n\nAdditional Webpack configurations are available for common tasks:\n\n* `npm run lint` runs the linter for JavaScript ES6 style checking.\n* `npm run dev` builds the web application in development mode, but generates static files rather than creating a web server. This is useful if you are hosting a remote development environment.\n* `npm run sass` builds the web application in development mode with a local server (the same as `npm start`), but also includes sourcemapping for Sass files. However, this does result in slower builds.\n* `npm run travis` is reserved for the Travis CI system and runs the linter and Jest tests in a single thread with error reporting.\n",
    "contributors": 27,
    "contributors_list": [
      {
        "avatar_url": "https://avatars3.githubusercontent.com/u/3594363?v=4",
        "profile_url": "https://github.com/kevinli-work",
        "user_type": "User",
        "username": "kevinli-work"
      },
      {
        "avatar_url": "https://avatars2.githubusercontent.com/u/4449046?v=4",
        "profile_url": "https://github.com/mab6bf",
        "user_type": "User",
        "username": "mab6bf"
      },
      {
        "avatar_url": "https://avatars0.githubusercontent.com/u/7108785?v=4",
        "profile_url": "https://github.com/ebdabbs",
        "user_type": "User",
        "username": "ebdabbs"
      },
      {
        "avatar_url": "https://avatars1.githubusercontent.com/u/19807146?v=4",
        "profile_url": "https://github.com/ejgullo",
        "user_type": "User",
        "username": "ejgullo"
      },
      {
        "avatar_url": "https://avatars3.githubusercontent.com/u/13661813?v=4",
        "profile_url": "https://github.com/dtrinh50",
        "user_type": "User",
        "username": "dtrinh50"
      },
      {
        "avatar_url": "https://avatars2.githubusercontent.com/u/256019?v=4",
        "profile_url": "https://github.com/dfrasier",
        "user_type": "User",
        "username": "dfrasier"
      },
      {
        "avatar_url": "https://avatars0.githubusercontent.com/u/5605410?v=4",
        "profile_url": "https://github.com/AGuyNamedMarco",
        "user_type": "User",
        "username": "AGuyNamedMarco"
      },
      {
        "avatar_url": "https://avatars2.githubusercontent.com/u/1631162?v=4",
        "profile_url": "https://github.com/willkjackson",
        "user_type": "User",
        "username": "willkjackson"
      },
      {
        "avatar_url": "https://avatars0.githubusercontent.com/u/4334164?v=4",
        "profile_url": "https://github.com/kim-minahm",
        "user_type": "User",
        "username": "kim-minahm"
      },
      {
        "avatar_url": "https://avatars2.githubusercontent.com/u/16244012?v=4",
        "profile_url": "https://github.com/nmonga91",
        "user_type": "User",
        "username": "nmonga91"
      },
      {
        "avatar_url": "https://avatars3.githubusercontent.com/u/25374322?v=4",
        "profile_url": "https://github.com/anrichard",
        "user_type": "User",
        "username": "anrichard"
      },
      {
        "avatar_url": "https://avatars3.githubusercontent.com/u/9648573?v=4",
        "profile_url": "https://github.com/kojodoesdesign",
        "user_type": "User",
        "username": "kojodoesdesign"
      },
      {
        "avatar_url": "https://avatars1.githubusercontent.com/u/22781949?v=4",
        "profile_url": "https://github.com/tony-sappe",
        "user_type": "User",
        "username": "tony-sappe"
      },
      {
        "avatar_url": "https://avatars3.githubusercontent.com/u/7121943?v=4",
        "profile_url": "https://github.com/lesseradmin",
        "user_type": "User",
        "username": "lesseradmin"
      },
      {
        "avatar_url": "https://avatars2.githubusercontent.com/u/29313570?v=4",
        "profile_url": "https://github.com/dpb-bah",
        "user_type": "User",
        "username": "dpb-bah"
      },
      {
        "avatar_url": "https://avatars1.githubusercontent.com/u/4858967?v=4",
        "profile_url": "https://github.com/justinle",
        "user_type": "User",
        "username": "justinle"
      },
      {
        "avatar_url": "https://avatars0.githubusercontent.com/u/3599046?v=4",
        "profile_url": "https://github.com/IsaacRay",
        "user_type": "User",
        "username": "IsaacRay"
      },
      {
        "avatar_url": "https://avatars3.githubusercontent.com/u/75555?v=4",
        "profile_url": "https://github.com/kaitlin",
        "user_type": "User",
        "username": "kaitlin"
      },
      {
        "avatar_url": "https://avatars0.githubusercontent.com/u/13200616?v=4",
        "profile_url": "https://github.com/klrBAH",
        "user_type": "User",
        "username": "klrBAH"
      },
      {
        "avatar_url": "https://avatars1.githubusercontent.com/u/14953413?v=4",
        "profile_url": "https://github.com/kwhickey",
        "user_type": "User",
        "username": "kwhickey"
      },
      {
        "avatar_url": "https://avatars2.githubusercontent.com/u/6662582?v=4",
        "profile_url": "https://github.com/afrasier",
        "user_type": "User",
        "username": "afrasier"
      },
      {
        "avatar_url": "https://avatars0.githubusercontent.com/u/33040859?v=4",
        "profile_url": "https://github.com/hsharma96",
        "user_type": "User",
        "username": "hsharma96"
      },
      {
        "avatar_url": "https://avatars3.githubusercontent.com/u/4614454?v=4",
        "profile_url": "https://github.com/michaeldhess",
        "user_type": "User",
        "username": "michaeldhess"
      },
      {
        "avatar_url": "https://avatars0.githubusercontent.com/u/10016577?v=4",
        "profile_url": "https://github.com/wslack",
        "user_type": "User",
        "username": "wslack"
      },
      {
        "avatar_url": "https://avatars0.githubusercontent.com/u/382183?v=4",
        "profile_url": "https://github.com/fulldecent",
        "user_type": "User",
        "username": "fulldecent"
      },
      {
        "avatar_url": "https://avatars2.githubusercontent.com/u/11461802?v=4",
        "profile_url": "https://github.com/alburde1",
        "user_type": "User",
        "username": "alburde1"
      },
      {
        "avatar_url": "https://avatars0.githubusercontent.com/u/9831081?v=4",
        "profile_url": "https://github.com/russellbodine",
        "user_type": "User",
        "username": "russellbodine"
      }
    ],
    "stars": 48,
    "watchers": 30,
    "releases": 0,
    "rank": 4395,
    "repositoryUrl": "https://github.com/fedspendingtransparency/usaspending-website",
    "updatedAt": "2018-11-06T23:06:35Z",
    "id": "8397762_65394770",
    "downloads": 10
  },
  {
    "organization": "fedspendingtransparency",
    "organizationUrl": "https://github.com/fedspendingtransparency",
    "organizationType": "Organization",
    "organizationAvatarUrl": "https://avatars0.githubusercontent.com/u/8397762?v=4",
    "origin": "PUBLIC",
    "project_name": "fedspendingtransparency.github.io",
    "full_name": "fedspendingtransparency/fedspendingtransparency.github.io",
    "project_description": "Federal Spending Transparency",
    "repository": "fedspendingtransparency.github.io",
    "forkedRepos": [
      {
        "id": "21971229_156112969",
        "name": "fedspendingtransparency.github.io",
        "org_name": "ebuxheli"
      },
      {
        "id": "38471104_153148720",
        "name": "fedspendingtransparency.github.io",
        "org_name": "MachineLearningMentor"
      },
      {
        "id": "43525519_150427687",
        "name": "fedspendingtransparency.github.io",
        "org_name": "stuntman7200"
      },
      {
        "id": "23030160_145236297",
        "name": "fedspendingtransparency.github.io",
        "org_name": "KulieX"
      },
      {
        "id": "7486845_140328921",
        "name": "fedspendingtransparency.github.io",
        "org_name": "animatecitizen"
      },
      {
        "id": "13339261_139382650",
        "name": "fedspendingtransparency.github.io",
        "org_name": "alexwelcing"
      },
      {
        "id": "21081430_136941607",
        "name": "fedspendingtransparency.github.io",
        "org_name": "gitapablabah"
      },
      {
        "id": "36228931_136890471",
        "name": "fedspendingtransparency.github.io",
        "org_name": "Arnab2310"
      },
      {
        "id": "27846603_126022675",
        "name": "fedspendingtransparency.github.io",
        "org_name": "ruck1979"
      },
      {
        "id": "26306153_124697709",
        "name": "fedspendingtransparency.github.io",
        "org_name": "NiCOx539"
      },
      {
        "id": "11917205_124642616",
        "name": "fedspendingtransparency.github.io",
        "org_name": "Louis-Brown"
      },
      {
        "id": "28880514_124115586",
        "name": "fedspendingtransparency.github.io",
        "org_name": "palexcode"
      },
      {
        "id": "3534011_123449761",
        "name": "fedspendingtransparency.github.io",
        "org_name": "sureshadapa"
      },
      {
        "id": "810116_121643081",
        "name": "fedspendingtransparency.github.io",
        "org_name": "bobbr"
      },
      {
        "id": "33095374_119992647",
        "name": "fedspendingtransparency.github.io",
        "org_name": "henrygwazda"
      },
      {
        "id": "2313049_119744615",
        "name": "fedspendingtransparency.github.io",
        "org_name": "Iv4nLar1"
      },
      {
        "id": "5068820_119310601",
        "name": "fedspendingtransparency.github.io",
        "org_name": "f35"
      },
      {
        "id": "35307547_117001976",
        "name": "fedfmdataelements.github.io",
        "org_name": "tamiawilliams"
      },
      {
        "id": "29710631_116599559",
        "name": "fedspendingtransparency.github.io",
        "org_name": "dhrghshwri"
      },
      {
        "id": "1590241_116569951",
        "name": "fedspendingtransparency.github.io",
        "org_name": "xldrkp"
      },
      {
        "id": "34811785_116460224",
        "name": "fedspendingtransparency.github.io",
        "org_name": "willzjc"
      },
      {
        "id": "34380717_116288086",
        "name": "fedspendingtransparency.github.io",
        "org_name": "FITStaff"
      },
      {
        "id": "7327742_115629516",
        "name": "fedspendingtransparency.github.io",
        "org_name": "geol1729"
      },
      {
        "id": "13286164_115514926",
        "name": "fedspendingtransparency.github.io",
        "org_name": "tectronics"
      },
      {
        "id": "17453425_113890029",
        "name": "fedspendingtransparency.github.io",
        "org_name": "mbwordup"
      },
      {
        "id": "7324211_113824443",
        "name": "fedspendingtransparency.github.io",
        "org_name": "kishorsawant8707"
      },
      {
        "id": "1431005_113510639",
        "name": "fedspendingtransparency.github.io",
        "org_name": "firebitsbr"
      },
      {
        "id": "14286498_112890221",
        "name": "fedspendingtransparency.github.io",
        "org_name": "jjacob15"
      },
      {
        "id": "1760244_112665177",
        "name": "fedspendingtransparency.github.io",
        "org_name": "352Media"
      },
      {
        "id": "21317551_111043555",
        "name": "fedspendingtransparency.github.io",
        "org_name": "jencyf"
      },
      {
        "id": "6574942_110988614",
        "name": "fedspendingtransparency.github.io",
        "org_name": "edmargomes"
      },
      {
        "id": "15028981_110980478",
        "name": "fedspendingtransparency.github.io",
        "org_name": "yoro4646"
      },
      {
        "id": "2591875_110610778",
        "name": "fedspendingtransparency.github.io",
        "org_name": "IncubatedChun"
      },
      {
        "id": "2342781_110282256",
        "name": "fedspendingtransparency.github.io",
        "org_name": "pyella"
      },
      {
        "id": "5472446_110039509",
        "name": "fedspendingtransparency.github.io",
        "org_name": "abhishek-jain11"
      },
      {
        "id": "32297287_109981930",
        "name": "fedspendingtransparency.github.io",
        "org_name": "02041985"
      },
      {
        "id": "6791021_109167243",
        "name": "fedspendingtransparency.github.io",
        "org_name": "bwstud"
      },
      {
        "id": "33096558_108873438",
        "name": "fedspendingtransparency.github.io",
        "org_name": "pataty"
      },
      {
        "id": "17577205_108582657",
        "name": "fedspendingtransparency.github.io",
        "org_name": "sprouls22"
      },
      {
        "id": "33068518_108162586",
        "name": "fedspendingtransparency.github.io",
        "org_name": "LJagadeeswar"
      },
      {
        "id": "32214457_108025794",
        "name": "fedspendingtransparency.github.io",
        "org_name": "manojnair82"
      },
      {
        "id": "1084394_107994167",
        "name": "fedspendingtransparency.github.io",
        "org_name": "cestlavieww"
      },
      {
        "id": "1623327_107161351",
        "name": "fedspendingtransparency.github.io",
        "org_name": "a-severin"
      },
      {
        "id": "32801471_106953716",
        "name": "fedspendingtransparency.github.io",
        "org_name": "kris-benefield"
      },
      {
        "id": "10435832_106569510",
        "name": "fedspendingtransparency.github.io",
        "org_name": "Dripdrop12"
      },
      {
        "id": "17135495_106429629",
        "name": "fedspendingtransparency.github.io",
        "org_name": "lolade94"
      },
      {
        "id": "32439670_106049336",
        "name": "fedspendingtransparency.github.io",
        "org_name": "hadeelahmed55"
      },
      {
        "id": "32572849_106008868",
        "name": "fedspendingtransparency.github.io",
        "org_name": "calcanod"
      },
      {
        "id": "32139637_105956286",
        "name": "fedspendingtransparency.github.io",
        "org_name": "aleshaphelps"
      },
      {
        "id": "3229215_105815428",
        "name": "fedspendingtransparency.github.io",
        "org_name": "korinah79"
      },
      {
        "id": "29930202_105556028",
        "name": "fedspendingtransparency.github.io",
        "org_name": "kig-analytics"
      },
      {
        "id": "29202343_105028757",
        "name": "fedspendingtransparency.github.io",
        "org_name": "sabrina-rc"
      },
      {
        "id": "11674145_104507762",
        "name": "fedspendingtransparency.github.io",
        "org_name": "yehk"
      },
      {
        "id": "8870292_102795599",
        "name": "fedspendingtransparency.github.io",
        "org_name": "dvdmuckle"
      },
      {
        "id": "21692761_102627654",
        "name": "fedspendingtransparency.github.io",
        "org_name": "gencomsolar"
      },
      {
        "id": "24255824_101438060",
        "name": "fedspendingtransparency.github.io",
        "org_name": "lpowell12"
      },
      {
        "id": "8322728_101205675",
        "name": "fedspendingtransparency.github.io",
        "org_name": "CB2"
      },
      {
        "id": "26463_97637471",
        "name": "fedspendingtransparency.github.io",
        "org_name": "jpmckinney"
      },
      {
        "id": "1623538_97183619",
        "name": "fedspendingtransparency.github.io",
        "org_name": "CNXTEoEorg"
      },
      {
        "id": "25781391_82079167",
        "name": "fedspendingtransparency.github.io",
        "org_name": "datarescue"
      },
      {
        "id": "1999898_80521692",
        "name": "fedspendingtransparency.github.io",
        "org_name": "nixu"
      },
      {
        "id": "25255828_79602347",
        "name": "fedspendingtransparency.github.io",
        "org_name": "klingerf2"
      },
      {
        "id": "24708446_77104682",
        "name": "fedspendingtransparency.github.io",
        "org_name": "joshuaeveleth"
      },
      {
        "id": "24689290_77014428",
        "name": "fedspendingtransparency.github.io",
        "org_name": "govtmirror"
      },
      {
        "id": "305137_76749966",
        "name": "fedspendingtransparency.github.io",
        "org_name": "jeveleth"
      },
      {
        "id": "16707705_73102792",
        "name": "fedspendingtransparency.github.io",
        "org_name": "alexjajabah"
      },
      {
        "id": "1444176_72110246",
        "name": "fedspendingtransparency.github.io",
        "org_name": "karlaturcios"
      },
      {
        "id": "605331_64395664",
        "name": "fedspendingtransparency.github.io",
        "org_name": "bbrotsos"
      },
      {
        "id": "11844868_55792730",
        "name": "fedspendingtransparency.github.io",
        "org_name": "nickingman"
      },
      {
        "id": "11721558_35221684",
        "name": "fedspendingtransparency.github.io",
        "org_name": "pattycapp"
      },
      {
        "id": "6233994_32608859",
        "name": "fedspendingtransparency.github.io",
        "org_name": "18F"
      },
      {
        "id": "11236174_31679190",
        "name": "fedspendingtransparency.github.io",
        "org_name": "DataManagementOffice"
      },
      {
        "id": "8703755_30595668",
        "name": "fedspendingtransparency.github.io",
        "org_name": "OMBOFFM"
      },
      {
        "id": "7278176_30251363",
        "name": "fedspendingtransparency.github.io",
        "org_name": "carvajalbr"
      },
      {
        "id": "540544_28048377",
        "name": "fedspendingtransparency.github.io",
        "org_name": "bsweger"
      },
      {
        "id": "10062287_27491195",
        "name": "fedspendingtransparency.github.io",
        "org_name": "cpece"
      },
      {
        "id": "9536018_26131482",
        "name": "fedspendingtransparency.github.io",
        "org_name": "bebe6620"
      },
      {
        "id": "75555_24612162",
        "name": "fedspendingtransparency",
        "org_name": "kaitlin"
      }
    ],
    "commits": 2512,
    "language": "CSS",
    "languages": {
      "CSS": "232777",
      "HTML": "104098",
      "JavaScript": "141881",
      "Ruby": "70311",
      "Shell": "508"
    },
    "content": "# Welcome to the Federal Spending Transparency Collaboration Page\n\n\n[![Build Status](https://travis-ci.org/project-open-data/project-open-data.github.io.png?branch=master)](https://travis-ci.org/project-open-data/project-open-data.github.io)\n\n## How to Contribute\n\nFor information on how to contribute, please click [here](contributing.md)\n\n## License\n\nThe project is a public domain work and is not subject to domestic or international copyright protection. See [the license file](LICENSE) for additional information.\n\nMembers of the public and US government employees who wish to contribute are encourage to do so, but by contributing, dedicate their work to the public domain and waive all rights to their contribution under the terms of the [CC0 Public Domain Dedication](http://creativecommons.org/publicdomain/zero/1.0/).\n\n## Privacy\n\nComments, pull requests and any other messages received through this repository may be subject to the [Presidential Records Act](http://www.archives.gov/about/laws/presidential-records.html) and may be archived. Learn more at http://WhiteHouse.gov/privacy\n",
    "contributors": 59,
    "contributors_list": [
      {
        "avatar_url": "https://avatars0.githubusercontent.com/u/25013368?v=4",
        "profile_url": "https://github.com/mmeintelwade",
        "user_type": "User",
        "username": "mmeintelwade"
      },
      {
        "avatar_url": "https://avatars3.githubusercontent.com/u/6922586?v=4",
        "profile_url": "https://github.com/murface",
        "user_type": "User",
        "username": "murface"
      },
      {
        "avatar_url": "https://avatars2.githubusercontent.com/u/633088?v=4",
        "profile_url": "https://github.com/gbinal",
        "user_type": "User",
        "username": "gbinal"
      },
      {
        "avatar_url": "https://avatars3.githubusercontent.com/u/2327395?v=4",
        "profile_url": "https://github.com/haleyvandyck",
        "user_type": "User",
        "username": "haleyvandyck"
      },
      {
        "avatar_url": "https://avatars3.githubusercontent.com/u/75555?v=4",
        "profile_url": "https://github.com/kaitlin",
        "user_type": "User",
        "username": "kaitlin"
      },
      {
        "avatar_url": "https://avatars2.githubusercontent.com/u/540544?v=4",
        "profile_url": "https://github.com/bsweger",
        "user_type": "User",
        "username": "bsweger"
      },
      {
        "avatar_url": "https://avatars2.githubusercontent.com/u/8397754?v=4",
        "profile_url": "https://github.com/rmaziarz",
        "user_type": "User",
        "username": "rmaziarz"
      },
      {
        "avatar_url": "https://avatars2.githubusercontent.com/u/256019?v=4",
        "profile_url": "https://github.com/dfrasier",
        "user_type": "User",
        "username": "dfrasier"
      },
      {
        "avatar_url": "https://avatars2.githubusercontent.com/u/7362915?v=4",
        "profile_url": "https://github.com/elainekamlley",
        "user_type": "User",
        "username": "elainekamlley"
      },
      {
        "avatar_url": "https://avatars3.githubusercontent.com/u/16655897?v=4",
        "profile_url": "https://github.com/aprilosajima",
        "user_type": "User",
        "username": "aprilosajima"
      },
      {
        "avatar_url": "https://avatars1.githubusercontent.com/u/183402?v=4",
        "profile_url": "https://github.com/philipashlock",
        "user_type": "User",
        "username": "philipashlock"
      },
      {
        "avatar_url": "https://avatars0.githubusercontent.com/u/489465?v=4",
        "profile_url": "https://github.com/MarinaMartin",
        "user_type": "User",
        "username": "MarinaMartin"
      },
      {
        "avatar_url": "https://avatars1.githubusercontent.com/u/14617535?v=4",
        "profile_url": "https://github.com/wmidcap",
        "user_type": "User",
        "username": "wmidcap"
      },
      {
        "avatar_url": "https://avatars3.githubusercontent.com/u/282759?v=4",
        "profile_url": "https://github.com/benbalter",
        "user_type": "User",
        "username": "benbalter"
      },
      {
        "avatar_url": "https://avatars1.githubusercontent.com/u/26463?v=4",
        "profile_url": "https://github.com/jpmckinney",
        "user_type": "User",
        "username": "jpmckinney"
      },
      {
        "avatar_url": "https://avatars1.githubusercontent.com/u/32879513?v=4",
        "profile_url": "https://github.com/dylanbah",
        "user_type": "User",
        "username": "dylanbah"
      },
      {
        "avatar_url": "https://avatars0.githubusercontent.com/u/5605410?v=4",
        "profile_url": "https://github.com/AGuyNamedMarco",
        "user_type": "User",
        "username": "AGuyNamedMarco"
      },
      {
        "avatar_url": "https://avatars2.githubusercontent.com/u/1626026?v=4",
        "profile_url": "https://github.com/ErieMeyer",
        "user_type": "User",
        "username": "ErieMeyer"
      },
      {
        "avatar_url": "https://avatars1.githubusercontent.com/u/1542343?v=4",
        "profile_url": "https://github.com/andrew-wolfe",
        "user_type": "User",
        "username": "andrew-wolfe"
      },
      {
        "avatar_url": "https://avatars3.githubusercontent.com/u/16667780?v=4",
        "profile_url": "https://github.com/lisaam",
        "user_type": "User",
        "username": "lisaam"
      },
      {
        "avatar_url": "https://avatars3.githubusercontent.com/u/301547?v=4",
        "profile_url": "https://github.com/mbland",
        "user_type": "User",
        "username": "mbland"
      },
      {
        "avatar_url": "https://avatars2.githubusercontent.com/u/4827522?v=4",
        "profile_url": "https://github.com/meiqimichelle",
        "user_type": "User",
        "username": "meiqimichelle"
      },
      {
        "avatar_url": "https://avatars3.githubusercontent.com/u/1980690?v=4",
        "profile_url": "https://github.com/jqnatividad",
        "user_type": "User",
        "username": "jqnatividad"
      },
      {
        "avatar_url": "https://avatars2.githubusercontent.com/u/394890?v=4",
        "profile_url": "https://github.com/mhogeweg",
        "user_type": "User",
        "username": "mhogeweg"
      },
      {
        "avatar_url": "https://avatars1.githubusercontent.com/u/187271?v=4",
        "profile_url": "https://github.com/DruidSmith",
        "user_type": "User",
        "username": "DruidSmith"
      },
      {
        "avatar_url": "https://avatars3.githubusercontent.com/u/4398330?v=4",
        "profile_url": "https://github.com/stevenvdc",
        "user_type": "User",
        "username": "stevenvdc"
      },
      {
        "avatar_url": "https://avatars2.githubusercontent.com/u/16707705?v=4",
        "profile_url": "https://github.com/alexjajabah",
        "user_type": "User",
        "username": "alexjajabah"
      },
      {
        "avatar_url": "https://avatars0.githubusercontent.com/u/4592?v=4",
        "profile_url": "https://github.com/konklone",
        "user_type": "User",
        "username": "konklone"
      },
      {
        "avatar_url": "https://avatars2.githubusercontent.com/u/445875?v=4",
        "profile_url": "https://github.com/JoshData",
        "user_type": "User",
        "username": "JoshData"
      },
      {
        "avatar_url": "https://avatars0.githubusercontent.com/u/4323988?v=4",
        "profile_url": "https://github.com/leahbannon",
        "user_type": "User",
        "username": "leahbannon"
      },
      {
        "avatar_url": "https://avatars2.githubusercontent.com/u/2192740?v=4",
        "profile_url": "https://github.com/willpugh",
        "user_type": "User",
        "username": "willpugh"
      },
      {
        "avatar_url": "https://avatars0.githubusercontent.com/u/1282711?v=4",
        "profile_url": "https://github.com/dwcaraway",
        "user_type": "User",
        "username": "dwcaraway"
      },
      {
        "avatar_url": "https://avatars1.githubusercontent.com/u/11674145?v=4",
        "profile_url": "https://github.com/yehk",
        "user_type": "User",
        "username": "yehk"
      },
      {
        "avatar_url": "https://avatars2.githubusercontent.com/u/2466345?v=4",
        "profile_url": "https://github.com/micahsaul",
        "user_type": "User",
        "username": "micahsaul"
      },
      {
        "avatar_url": "https://avatars1.githubusercontent.com/u/29202343?v=4",
        "profile_url": "https://github.com/sabrina-rc",
        "user_type": "User",
        "username": "sabrina-rc"
      },
      {
        "avatar_url": "https://avatars0.githubusercontent.com/u/1392461?v=4",
        "profile_url": "https://github.com/FuhuXia",
        "user_type": "User",
        "username": "FuhuXia"
      },
      {
        "avatar_url": "https://avatars1.githubusercontent.com/u/4623796?v=4",
        "profile_url": "https://github.com/pschweitzerusgsgov",
        "user_type": "User",
        "username": "pschweitzerusgsgov"
      },
      {
        "avatar_url": "https://avatars1.githubusercontent.com/u/12112?v=4",
        "profile_url": "https://github.com/GUI",
        "user_type": "User",
        "username": "GUI"
      },
      {
        "avatar_url": "https://avatars2.githubusercontent.com/u/512243?v=4",
        "profile_url": "https://github.com/acouch",
        "user_type": "User",
        "username": "acouch"
      },
      {
        "avatar_url": "https://avatars0.githubusercontent.com/u/2141964?v=4",
        "profile_url": "https://github.com/vurcease",
        "user_type": "User",
        "username": "vurcease"
      },
      {
        "avatar_url": "https://avatars2.githubusercontent.com/u/2566199?v=4",
        "profile_url": "https://github.com/digiphile",
        "user_type": "User",
        "username": "digiphile"
      },
      {
        "avatar_url": "https://avatars1.githubusercontent.com/u/26813?v=4",
        "profile_url": "https://github.com/listrophy",
        "user_type": "User",
        "username": "listrophy"
      },
      {
        "avatar_url": "https://avatars1.githubusercontent.com/u/282860?v=4",
        "profile_url": "https://github.com/danmunz",
        "user_type": "User",
        "username": "danmunz"
      },
      {
        "avatar_url": "https://avatars3.githubusercontent.com/u/58678?v=4",
        "profile_url": "https://github.com/et",
        "user_type": "User",
        "username": "et"
      },
      {
        "avatar_url": "https://avatars0.githubusercontent.com/u/21081430?v=4",
        "profile_url": "https://github.com/gitapablabah",
        "user_type": "User",
        "username": "gitapablabah"
      },
      {
        "avatar_url": "https://avatars2.githubusercontent.com/u/204769?v=4",
        "profile_url": "https://github.com/jonasalmeida",
        "user_type": "User",
        "username": "jonasalmeida"
      },
      {
        "avatar_url": "https://avatars2.githubusercontent.com/u/1645884?v=4",
        "profile_url": "https://github.com/jsturdevant",
        "user_type": "User",
        "username": "jsturdevant"
      },
      {
        "avatar_url": "https://avatars1.githubusercontent.com/u/430112?v=4",
        "profile_url": "https://github.com/dotmike",
        "user_type": "User",
        "username": "dotmike"
      },
      {
        "avatar_url": "https://avatars1.githubusercontent.com/u/1970829?v=4",
        "profile_url": "https://github.com/MikePulsiferDOL",
        "user_type": "User",
        "username": "MikePulsiferDOL"
      },
      {
        "avatar_url": "https://avatars2.githubusercontent.com/u/77759?v=4",
        "profile_url": "https://github.com/pborreli",
        "user_type": "User",
        "username": "pborreli"
      },
      {
        "avatar_url": "https://avatars1.githubusercontent.com/u/17545?v=4",
        "profile_url": "https://github.com/rrbaker",
        "user_type": "User",
        "username": "rrbaker"
      },
      {
        "avatar_url": "https://avatars0.githubusercontent.com/u/705860?v=4",
        "profile_url": "https://github.com/defvol",
        "user_type": "User",
        "username": "defvol"
      },
      {
        "avatar_url": "https://avatars1.githubusercontent.com/u/442198?v=4",
        "profile_url": "https://github.com/rypan",
        "user_type": "User",
        "username": "rypan"
      },
      {
        "avatar_url": "https://avatars0.githubusercontent.com/u/8048778?v=4",
        "profile_url": "https://github.com/aoelschlaeger",
        "user_type": "User",
        "username": "aoelschlaeger"
      },
      {
        "avatar_url": "https://avatars2.githubusercontent.com/u/3663133?v=4",
        "profile_url": "https://github.com/dsmorgan77",
        "user_type": "User",
        "username": "dsmorgan77"
      },
      {
        "avatar_url": "https://avatars3.githubusercontent.com/u/196248?v=4",
        "profile_url": "https://github.com/jhawk28",
        "user_type": "User",
        "username": "jhawk28"
      },
      {
        "avatar_url": "https://avatars1.githubusercontent.com/u/4492448?v=4",
        "profile_url": "https://github.com/nice-giraffe",
        "user_type": "User",
        "username": "nice-giraffe"
      },
      {
        "avatar_url": "https://avatars3.githubusercontent.com/u/987237?v=4",
        "profile_url": "https://github.com/russellpwirtz",
        "user_type": "User",
        "username": "russellpwirtz"
      },
      {
        "avatar_url": "https://avatars2.githubusercontent.com/u/77741?v=4",
        "profile_url": "https://github.com/scor",
        "user_type": "User",
        "username": "scor"
      }
    ],
    "stars": 45,
    "watchers": 59,
    "releases": 0,
    "rank": 3178,
    "repositoryUrl": "https://github.com/fedspendingtransparency/fedspendingtransparency.github.io",
    "updatedAt": "2018-11-07T21:15:50Z",
    "id": "8397762_24609061",
    "downloads": 10
  },
  {
    "organization": "fedspendingtransparency",
    "organizationUrl": "https://github.com/fedspendingtransparency",
    "organizationType": "Organization",
    "organizationAvatarUrl": "https://avatars0.githubusercontent.com/u/8397762?v=4",
    "origin": "PUBLIC",
    "project_name": "data-act-broker-web-app",
    "full_name": "fedspendingtransparency/data-act-broker-web-app",
    "project_description": "Website to test data validation and submission process",
    "repository": "data-act-broker-web-app",
    "forkedRepos": [
      {
        "id": "25860582_132200522",
        "name": "data-act-broker-web-app",
        "org_name": "pebsconsulting"
      },
      {
        "id": "1623538_97207460",
        "name": "data-act-broker-web-app",
        "org_name": "CNXTEoEorg"
      },
      {
        "id": "17577139_93560800",
        "name": "data-act-broker-web-app",
        "org_name": "kristinesweet"
      },
      {
        "id": "13103559_86161698",
        "name": "data-act-broker-web-app",
        "org_name": "nibirunemisis"
      },
      {
        "id": "181962_82309673",
        "name": "data-act-broker-web-app",
        "org_name": "keheliya"
      },
      {
        "id": "6524079_79825673",
        "name": "data-act-broker-web-app",
        "org_name": "jstvssr"
      },
      {
        "id": "25255828_79602354",
        "name": "data-act-broker-web-app",
        "org_name": "klingerf2"
      },
      {
        "id": "24708446_77104694",
        "name": "data-act-broker-web-app",
        "org_name": "joshuaeveleth"
      },
      {
        "id": "24689290_77014432",
        "name": "data-act-broker-web-app",
        "org_name": "govtmirror"
      },
      {
        "id": "305137_76749972",
        "name": "data-act-broker-web-app",
        "org_name": "jeveleth"
      },
      {
        "id": "6578161_74174651",
        "name": "data-act-broker-web-app",
        "org_name": "JerJohn15"
      },
      {
        "id": "13200616_74146627",
        "name": "data-act-broker-web-app",
        "org_name": "klrBAH"
      },
      {
        "id": "22893964_74065216",
        "name": "data-act-broker-web-app",
        "org_name": "StacSch"
      },
      {
        "id": "131426_73655726",
        "name": "data-act-broker-web-app",
        "org_name": "brunsa2"
      },
      {
        "id": "742350_73112108",
        "name": "data-act-broker-web-app",
        "org_name": "us1415"
      },
      {
        "id": "6374832_72952591",
        "name": "data-act-broker-web-app",
        "org_name": "amilajack"
      },
      {
        "id": "1841073_72938166",
        "name": "data-act-broker-web-app",
        "org_name": "integral-llc"
      },
      {
        "id": "20047679_69577578",
        "name": "data-act-broker-web-app",
        "org_name": "siempa"
      },
      {
        "id": "16667780_58212619",
        "name": "data-act-broker-web-app",
        "org_name": "lisaam"
      }
    ],
    "commits": 2870,
    "language": "JavaScript",
    "languages": {
      "CSS": "142226",
      "Dockerfile": "246",
      "HTML": "395",
      "JavaScript": "812419"
    },
    "content": "# DATA Act Broker Web App\n\nThe DATA Act broker website is the front-end to the [DATA Act broker backend](https://github.com/fedspendingtransparency/data-act-broker-backend \"DATA Act broker backend\").\n\n## Development Set Up\n\nTo stand up a local copy of the DATA Act broker website, follow the directions below.\n\nAssumptions:\n\n* You're able to install software on your machine.\n* You have git installed on your machine and are able to clone code repositories from GitHub. If this isn't the case, the easiest way to get started is to install [GitHub Desktop](https://desktop.github.com/ \"GitHub desktop\"), available for Windows or Mac.\n* You're familiar with opening a terminal on your machine and using the command line as needed.\n\n### Install Prerequisites and Code\n\n1. If you're not already running Node.js, download and run the installer for your operating system. We recommend v4.x: [https://nodejs.org/en/](https://nodejs.org/en/ \"Node.js installer\").\n\n2. Use *npm* (Node's package manager, which is part of the Node.js install) to install the latest version of gulp. This is necessary for runing the babel version of the `gulpfile`):\n\n    ```bash\n        $ npm install gulp && npm install gulp -g\n    ```\n\n3. From the command line, clone the DATA Act web app repository from GitHub to your local machine:\n\n        $ git clone https://github.com/fedspendingtransparency/data-act-broker-web-app.git\n\n4. Switch to the alpha release version of the code. This is the latest stable release.\n\n        $ git checkout v0.1.0-alpha\n\n    **Note:** If you'd rather use the latest, work-in-progress features of the DATA Act broker, replace the above command with `git checkout staging`.\n\n5. Change to the `data-act-broker-web-app` directory that was created when you cloned the DATA Act web repository.\n\n6. Install the web application's package dependencies:\n\n        $ npm install\n\n\n### Create Configurations\n\nThe `data-act-broker-web-app` folder provides three sample `GlobalConstants` files:\n\n * `sampleGlobalConstants_dev.js`\n * `sampleGlobalConstants_local.js`\n * `sampleGlobalConstants_prod.js`.\n\nUse these sample files to create files named `GlobalConstants_dev.js`, `GlobalConstants_local.js`, and `GlobalConstants_prod.js` respectively.\n\nThe sample files require you to provide values for:\n\n* `API` is the base API URL for the server that is hosting the API. It should start with an `https://` or `http://` protocol and end with `/v1/`, including the trailing slash\n\n\t* Note: the `sampleGlobalConstants_local.js` already has this field configured for you.\n\n* `LOCAL_ROOT` is the URL from which you are serving the frontend (this can be left as an empty string for non-local usage).\n* `CAS_ROOT` is the root endpoint for the [CAS server](https://apereo.github.io/cas/4.2.x/protocol/CAS-Protocol-Specification.html#cas-uris) when a CAS single sign-on service is used.\n* `AUTH_CALLBACK` is the [callback URL](https://apereo.github.io/cas/4.2.x/protocol/CAS-Protocol-Specification.html#response) that the CAS server redirects to upon successful login.\n* `GA_TRACKING_ID` is the tracking ID for Google Analytics.\n\nOther fields, such as `LOCAL` and `DEV` should be left based on their sample values.\n\n### Run gulp tasks:\n\nSeveral Gulp tasks are available to build the frontend web site for various use cases.\n\n#### Hosted Production\n\nIf you are building the web site for a hosted production environment, run:\n\n```bash\n\t$ gulp production\n```\nThis will build the frontend files to the `/public` directory, which you can then deploy on your host. In this mode, JavaScript files are minified, debugging tools are disabled, and the `GlobalConstants_prod.js` file is used as the GlobalConstants file.\n\n#### Local Production\n\nIf you are using the DATA Act Broker in a fully local environment and you are not a developer, run:\n\n```bash\n\t$ gulp\n```\nThis will build the frontend files to the `/public` directory and start a web server on port 3000. In this mode, JavaScript files are minified, debugging tools are disabled, and the `GlobalConstants_local.js` file is used as the GlobalConstants file.\n\nTo use the frontend, go to [http://localhost:3000](http://localhost:3000) in a supported web browser.\n\n*Note:* Before running the gulp task, ensure that no other applications or services are using port 3000 on your computer.\n\n#### Hosted Development (Build-only)\n\nIf you are deploying the frontend to a hosted environment for development/testing purposes, use:\n\n```bash\n\t$ gulp buildDev\n```\nThis will build the frontend files to the `/public` directory, which you can then deploy on your host. In this mode, JavaScript files are uncompressed and sourcemapped, debugging tools are enabled, and the `GlobalConstants_dev.js` file is used as the GlobalConstants file.\n\n#### Local Development\n\nFinally, if you are a frontend developer, use:\n\n```bash\n\t$ gulp dev\n```\n\nThis will build the frontend files to the `/public` directory and also start a web server on port 3000. In this mode, JavaScript files are uncompressed and sourcemapped, debugging tools are enabled and the `GlobalConstants_dev.js` file is used as the GlobalConstants file. Additionally, SASS files in the `/src/_scss` and `/src/css` folders are watched, along with JS files in the `/src/js` folder, and these files are recompiled (and the browser automatically refreshed) whenever a change is detected.\n\n### Running Tests\n\nTo run the unit test suite, run `npm test`.\n\n### Modifying global constants:\n\nIn the top level directory, you will find `GlobalConstants_prod.js`, `GlobalConstants_local.js`, and `GlobalConstant_dev.js` that you may use for any conditional, global constants, such as the API endpoint you'd like to point to in either given scenario.\n\n## Full DATA Act Broker Setup\n\nFor instructions on contributing to this project or installing the DATA Act broker backend, please refer to the [documentation in the DATA Act core responsitory](https://github.com/fedspendingtransparency/data-act-core/blob/master/doc/INSTALL.md \"DATA Act broker installation guide\").\n",
    "contributors": 28,
    "contributors_list": [
      {
        "avatar_url": "https://avatars3.githubusercontent.com/u/3594363?v=4",
        "profile_url": "https://github.com/kevinli-work",
        "user_type": "User",
        "username": "kevinli-work"
      },
      {
        "avatar_url": "https://avatars0.githubusercontent.com/u/4334164?v=4",
        "profile_url": "https://github.com/kim-minahm",
        "user_type": "User",
        "username": "kim-minahm"
      },
      {
        "avatar_url": "https://avatars2.githubusercontent.com/u/4449046?v=4",
        "profile_url": "https://github.com/mab6bf",
        "user_type": "User",
        "username": "mab6bf"
      },
      {
        "avatar_url": "https://avatars2.githubusercontent.com/u/11461802?v=4",
        "profile_url": "https://github.com/alburde1",
        "user_type": "User",
        "username": "alburde1"
      },
      {
        "avatar_url": "https://avatars0.githubusercontent.com/u/13200616?v=4",
        "profile_url": "https://github.com/klrBAH",
        "user_type": "User",
        "username": "klrBAH"
      },
      {
        "avatar_url": "https://avatars3.githubusercontent.com/u/4614454?v=4",
        "profile_url": "https://github.com/michaeldhess",
        "user_type": "User",
        "username": "michaeldhess"
      },
      {
        "avatar_url": "https://avatars2.githubusercontent.com/u/16244012?v=4",
        "profile_url": "https://github.com/nmonga91",
        "user_type": "User",
        "username": "nmonga91"
      },
      {
        "avatar_url": "https://avatars0.githubusercontent.com/u/654722?v=4",
        "profile_url": "https://github.com/kyle-fox",
        "user_type": "User",
        "username": "kyle-fox"
      },
      {
        "avatar_url": "https://avatars2.githubusercontent.com/u/256019?v=4",
        "profile_url": "https://github.com/dfrasier",
        "user_type": "User",
        "username": "dfrasier"
      },
      {
        "avatar_url": "https://avatars0.githubusercontent.com/u/7108785?v=4",
        "profile_url": "https://github.com/ebdabbs",
        "user_type": "User",
        "username": "ebdabbs"
      },
      {
        "avatar_url": "https://avatars1.githubusercontent.com/u/19807146?v=4",
        "profile_url": "https://github.com/ejgullo",
        "user_type": "User",
        "username": "ejgullo"
      },
      {
        "avatar_url": "https://avatars3.githubusercontent.com/u/16667780?v=4",
        "profile_url": "https://github.com/lisaam",
        "user_type": "User",
        "username": "lisaam"
      },
      {
        "avatar_url": "https://avatars3.githubusercontent.com/u/22891177?v=4",
        "profile_url": "https://github.com/kkuratsu",
        "user_type": "User",
        "username": "kkuratsu"
      },
      {
        "avatar_url": "https://avatars2.githubusercontent.com/u/29313570?v=4",
        "profile_url": "https://github.com/dpb-bah",
        "user_type": "User",
        "username": "dpb-bah"
      },
      {
        "avatar_url": "https://avatars3.githubusercontent.com/u/5183500?v=4",
        "profile_url": "https://github.com/shinson",
        "user_type": "User",
        "username": "shinson"
      },
      {
        "avatar_url": "https://avatars0.githubusercontent.com/u/22893964?v=4",
        "profile_url": "https://github.com/StacSch",
        "user_type": "User",
        "username": "StacSch"
      },
      {
        "avatar_url": "https://avatars0.githubusercontent.com/u/14811261?v=4",
        "profile_url": "https://github.com/ashikbanjade",
        "user_type": "User",
        "username": "ashikbanjade"
      },
      {
        "avatar_url": "https://avatars3.githubusercontent.com/u/75555?v=4",
        "profile_url": "https://github.com/kaitlin",
        "user_type": "User",
        "username": "kaitlin"
      },
      {
        "avatar_url": "https://avatars3.githubusercontent.com/u/13661813?v=4",
        "profile_url": "https://github.com/dtrinh50",
        "user_type": "User",
        "username": "dtrinh50"
      },
      {
        "avatar_url": "https://avatars2.githubusercontent.com/u/326918?v=4",
        "profile_url": "https://github.com/cmc333333",
        "user_type": "User",
        "username": "cmc333333"
      },
      {
        "avatar_url": "https://avatars0.githubusercontent.com/u/4643648?v=4",
        "profile_url": "https://github.com/mtpress",
        "user_type": "User",
        "username": "mtpress"
      },
      {
        "avatar_url": "https://avatars2.githubusercontent.com/u/1631162?v=4",
        "profile_url": "https://github.com/willkjackson",
        "user_type": "User",
        "username": "willkjackson"
      },
      {
        "avatar_url": "https://avatars0.githubusercontent.com/u/33040859?v=4",
        "profile_url": "https://github.com/hsharma96",
        "user_type": "User",
        "username": "hsharma96"
      },
      {
        "avatar_url": "https://avatars2.githubusercontent.com/u/540544?v=4",
        "profile_url": "https://github.com/bsweger",
        "user_type": "User",
        "username": "bsweger"
      },
      {
        "avatar_url": "https://avatars3.githubusercontent.com/u/9648573?v=4",
        "profile_url": "https://github.com/kojodoesdesign",
        "user_type": "User",
        "username": "kojodoesdesign"
      },
      {
        "avatar_url": "https://avatars1.githubusercontent.com/u/14953413?v=4",
        "profile_url": "https://github.com/kwhickey",
        "user_type": "User",
        "username": "kwhickey"
      },
      {
        "avatar_url": "https://avatars0.githubusercontent.com/u/11528424?v=4",
        "profile_url": "https://github.com/bahfolkoff",
        "user_type": "User",
        "username": "bahfolkoff"
      },
      {
        "avatar_url": "https://avatars2.githubusercontent.com/u/11858333?v=4",
        "profile_url": "https://github.com/jworcestBAH",
        "user_type": "User",
        "username": "jworcestBAH"
      }
    ],
    "stars": 14,
    "watchers": 27,
    "releases": 0,
    "rank": 3160,
    "repositoryUrl": "https://github.com/fedspendingtransparency/data-act-broker-web-app",
    "updatedAt": "2018-11-07T19:59:51Z",
    "id": "8397762_47277547",
    "downloads": 10
  },
  {
    "organization": "usdot-jpo-ode",
    "organizationUrl": "https://github.com/usdot-jpo-ode",
    "organizationType": "Organization",
    "organizationAvatarUrl": "https://avatars2.githubusercontent.com/u/23056647?v=4",
    "origin": "PUBLIC",
    "project_name": "jpo-ode",
    "full_name": "usdot-jpo-ode/jpo-ode",
    "project_description": "US Department of Transportation (USDOT) Intelligent Transportation Systems Operational Data Environment (ITS ODE). This is the main repository that integrates and coordinates ODE Submodules.",
    "repository": "jpo-ode",
    "forkedRepos": [
      {
        "id": "42840583_152122560",
        "name": "jpo-ode",
        "org_name": "darrelld05"
      },
      {
        "id": "7475771_145814291",
        "name": "jpo-ode",
        "org_name": "kssonu4u"
      },
      {
        "id": "38541284_130270574",
        "name": "jpo-ode",
        "org_name": "MarioDH"
      },
      {
        "id": "32356764_126688467",
        "name": "jpo-ode",
        "org_name": "yangsoso"
      },
      {
        "id": "1860862_123641545",
        "name": "jpo-ode",
        "org_name": "Edon07"
      },
      {
        "id": "1916753_120336776",
        "name": "jpo-ode",
        "org_name": "onthejeep"
      },
      {
        "id": "33533793_118946510",
        "name": "jpo-ode",
        "org_name": "OSUPCVLab"
      },
      {
        "id": "13427284_116835740",
        "name": "jpo-ode",
        "org_name": "wayties"
      },
      {
        "id": "28535848_94336819",
        "name": "jpo-ode",
        "org_name": "DOTAMC"
      },
      {
        "id": "1120608_90075506",
        "name": "jpo-ode",
        "org_name": "kimPerry"
      },
      {
        "id": "11353428_86829378",
        "name": "jpo-ode",
        "org_name": "sharafm2002"
      },
      {
        "id": "12912578_76863396",
        "name": "jpo-ode",
        "org_name": "mvs5465"
      },
      {
        "id": "10130982_75348929",
        "name": "jpo-ode",
        "org_name": "hmusavi"
      },
      {
        "id": "23481864_75121569",
        "name": "jpo-ode",
        "org_name": "mgarramo"
      },
      {
        "id": "5840989_75118639",
        "name": "jpo-ode",
        "org_name": "lauraGgit"
      }
    ],
    "commits": 2302,
    "language": "Java",
    "languages": {
      "Batchfile": "1948",
      "C": "4075",
      "CSS": "1617",
      "Dockerfile": "2906",
      "HTML": "4849",
      "Java": "2740483",
      "JavaScript": "3219",
      "Shell": "7650"
    },
    "content": "\n\nMaster: [![Build Status](https://travis-ci.org/usdot-jpo-ode/jpo-ode.svg?branch=master)](https://travis-ci.org/usdot-jpo-ode/jpo-ode) [![Quality Gate](https://sonarcloud.io/api/badges/gate?key=usdot.jpo.ode:jpo-ode)](https://sonarcloud.io/dashboard?id=usdot.jpo.ode%3Ajpo-ode)\n\nDevelop: [![Build Status](https://travis-ci.org/usdot-jpo-ode/jpo-ode.svg?branch=develop)](https://travis-ci.org/usdot-jpo-ode/jpo-ode) [![Quality Gate](https://sonarcloud.io/api/badges/gate?key=usdot.jpo.ode:jpo-ode:develop)](https://sonarcloud.io/dashboard?id=usdot.jpo.ode%3Ajpo-ode%3Adevelop)\n\n# jpo-ode\nUS Department of Transportation (USDOT) Intelligent Transportation Systems Operational Data Environment (ITS ODE)\n\nThe ITS ODE is a real-time virtual data router that ingests and processes operational data from various connected devices - including vehicles, infrastructure, and traffic management centers - and distributes it to other devices and subscribing transportation management applications. Using the ITS ODE within intelligent transportation deployments increases data fluidity and interoperability while meeting operational needs and protecting user privacy. The software’s microservices architecture makes it easy to add new capabilities to meet local needs.\n\n![ODE Dataflows](images/data_flow_v2.png)\n\n<a name=\"toc\"/>\n\n## Table of Contents\n\n[I. Release Notes](#release-notes)\n\n[II. Documentation](#documentation)\n\n[III. Collaboration Tools](#collaboration-tools)\n\n[IV. Getting Started](#getting-started)\n\n[V. Testing the Application](#testing)\n\n[VI. ODE Limitation](#dev-tools)\n\n[VII. Development Tools](#dev-tools)\n\n[VIII. Contribution Information](#contribution-info)\n\n[IX. Troubleshooting](#troubleshooting)\n\n---\n\n<a name=\"release-notes\"/>\n\n\n## [I. Release Notes](ReleaseNotes.md)\n\n\n<a name=\"documentation\"/>\n\n## II. Documentation\nODE provides the following living documents to keep ODE users and stakeholders informed of the latest developments:\n\n1. [ODE Architecture](docs/JPO%20ODE%20Architecture.docx)\n2. [ODE User Guide](docs/JPO_ODE_UserGuide.docx)\n3. [ODE Output Schema Reference Guide](docs/ODE_Output_Schema_Reference.docx)\n4. [ODE REST API Guide](https://usdot-jpo-ode.github.io/)\n5. [ODE Smoke Tests](https://github.com/usdot-jpo-ode/jpo-ode/wiki/JPO-ODE-QA-Documents)\n\nAll stakeholders are invited to provide input to these documents. Stakeholders should direct all input on this document to the JPO Product Owner at DOT, FHWA, and JPO. To provide feedback, we recommend that you create an \"issue\" in this repository (https://github.com/usdot-jpo-ode/jpo-ode/issues). You will need a GitHub account to create an issue. If you don’t have an account, a dialog will be presented to you to create one at no cost.\n\n<a name=\"collaboration-tools\"/>\n\n## III. Collaboration Tools\n\n### Source Repositories - GitHub\n- Main repository on GitHub (public)\n\t- https://github.com/usdot-jpo-ode/jpo-ode\n\t- git@github.com:usdot-jpo-ode/jpo-ode.git\n- Security repository on GitHub (public)\n        - https://github.com/usdot-jpo-ode/jpo-security.git\n\t- git@github.com:usdot-jpo-ode/jpo-security.git\n- Private repository on BitBucket\n\t- https://usdot-jpo-ode@bitbucket.org/usdot-jpo-ode/jpo-ode-private.git\n\t- git@bitbucket.org:usdot-jpo-ode/jpo-ode-private.git\n- Data Privacy Module on Github (public)\n\t- https://github.com/usdot-jpo-ode/jpo-cvdp\n\t- git@github.com/usdot-jpo-ode/jpo-cvdp\n- S3 Depositor Module on Github (public)\n\t- https://github.com/usdot-jpo-ode/jpo-s3-deposit\n\t- gith@github.com/usdot-jpo-ode/jpo-s3-deposit\n\n### Agile Project Management - Jira\nhttps://usdotjpoode.atlassian.net/secure/Dashboard.jspa\n\n### Wiki - Confluence\nhttps://usdotjpoode.atlassian.net/wiki/\n\n### Continuous Integration and Delivery\nhttps://travis-ci.org/usdot-jpo-ode/jpo-ode\n\nTo allow Travis run your build when you push your changes to your public fork of the jpo-ode repository, you must define the following secure environment variable using Travis CLI (https://github.com/travis-ci/travis.rb).\n\nRun:\n\n```\ntravis login --org\n```\nEnter personal github account credentials and then run this:\n\n```\ntravis env set BITBUCKET_UN_APP_PW 'yourbitbucketusername:yourbitbucketpassword' -r yourtravisusername/jpo-ode\n```\n\nThe login information will be saved and this needs to be done only once.\n\nIn order to allow Sonar to run, personal key must be added with this command:\n(Key can be obtained from the JPO-ODE development team)\n\n```\ntravis env set SONAR_SECURITY_TOKEN <key> -pr <user-account>/<repo-name>\n```\n\n### Static Code Analysis\nhttps://sonarcloud.io/organizations/usdot-jpo-ode/projects\n\n[Back to top](#toc)\n\n<a name=\"getting-started\"/>\n\n## IV. Getting Started\n\nThe following instructions describe the procedure to fetch, build, and run the application. If you are installing the ODE in an Ubuntu environment, see this [quick start guide](https://github.com/usdot-jpo-ode/jpo-ode/wiki/Prepare-a-fresh-Ubuntu-instance-for-ODE-installation).\n\n### Prerequisites\n* JDK 1.8: http://www.oracle.com/technetwork/pt/java/javase/downloads/jdk8-downloads-2133151.html\n* Maven: https://maven.apache.org/install.html\n* Git: https://git-scm.com/\n\nAdditionally, read the following guides to familiarize yourself with Docker and Kafka.\n\n**Docker**\n\n[README.md](docker/README.md)\n\n**Kafka**\n\n[README.md](docker/kafka/README.md)\n\n---\n### Obtain the Source Code\n\n**NOTE**: The ODE consists of four repositories:\n\n|Name|Visibility|Description|\n|----|----------|-----------|\n|[jpo-ode](https://github.com/usdot-jpo-ode/jpo-ode)|public|Contains the public components of the application code.|\n|[jpo-cvdp](https://github.com/usdot-jpo-ode/jpo-cvdp)|public|Privacy Protection Module|\n|[jpo-s3-deposit](https://github.com/usdot-jpo-ode/jpo-s3-deposit)|public|S3 depositor service. Optional, comment out of `docker-compose.yml` file if not used.|\n|[jpo-security](https://github.com/usdot-jpo-ode/jpo-security)|public|Security dependencies.|\n|[asn1_codec](https://github.com/usdot-jpo-ode/asn1_codec)|public|ASN.1 Encoder/Decoder module|\n|jpo-ode-private|private|Proprietary dependencies.|\n|[jpo-security-svcs](https://github.com/usdot-jpo-ode/jpo-security-svcs)|public|Provides cryptographic services.|\n\nBuilding this application requires all repositories. If you need access to the private repositories, please reach out to a member of the development team.\n\n\n#### Step 1 - Clone public repository\n\nDisable Git core.autocrlf (Only the First Time)\n**NOTE**: If running on Windows, please make sure that your global git config is set up to not convert End-of-Line characters during checkout. This is important for building docker images correctly.\n\n```bash\ngit config --global core.autocrlf false\n```\n\nClone the source code from the GitHub repository using Git command:\n\n```bash\ngit clone --recurse-submodules https://github.com/usdot-jpo-ode/jpo-ode.git\n```\n\n*Note*: Make sure you specify the --recurse-submodules option on the clone command line. This option will cause the cloning of all dependent submodules:\n- Privacy Protection Module (PPM) - [jpo-cvdp](https://github.com/usdot-jpo-ode/jpo-cvdp)\n- S3 Bucket Depositor - [jpo-s3-deposit](https://github.com/usdot-jpo-ode/jpo-s3-deposit)\n- Security - [jpo-security](https://github.com/usdot-jpo-ode/jpo-security)\n- Security Services Module- [jpo-security](https://github.com/usdot-jpo-ode/jpo-security-svcs)\n- ASN.1 CODEC - [asn1_codec](https://github.com/usdot-jpo-ode/asn1_codec)\n\n#### Step 2 - Clone private repository\n\nClone the source code from the BitBucket repository:\n\n```bash\ngit clone --recurse-submodules https://yourbitbucketusername:yourbitbucketpassword@bitbucket.org/usdot-jpo-ode/jpo-ode-private.git\n```\n\n---\n### Build and Deploy the Application\n\n#### Environment Variables\n\nODE configuration can be customized for every deployment environment using environment variables. These variables can either be set locally or using the *sample.env* file found in the root of the jpo-ode repository.\n\nInstructions for how to use the *sample.env* file can be found [here](https://github.com/usdot-jpo-ode/jpo-ode/wiki/Using-the-.env-configuration-file).\n\n**Important!** \nYou must rename `sample.env` to `.env` for Docker to automatically read the file. This file will contain AWS access keys and other private information. Do not push this file to source control.\n\n#### Build Process\n\n**Note** Docker builds may fail if you are on a corporate network due to DNS resolution errors. \n[See here](https://github.com/usdot-jpo-ode/jpo-ode/wiki/Docker-fix-for-SSL-issues-due-to-corporate-network) for instructions to fix this.\n\n**Note** In order for Docker to automatically read the environment variable file, you must rename it from `sample.env` to `.env`.\n\nThe ODE application uses Maven to manage builds.\n\n**Step 1**: Build the private repository artifacts consisting of J2735 ASN.1 Java API and IEEE1609.2 ASN.1 Java API\n\nNavigate to the root directory of the `jpo-ode-private` project:\n\n```bash\n cd jpo-ode-private/\n mvn clean install\n```\n\n**Step 2**: Build the public 1609.2 Security Library\n```bash\ncd jpo-security\nmvn clean install -DskipTests\n```\n\n**Step 3**: Build the S3 Bucket Depositor Service\n\nNote - if you do not intend on using this feature, edit the docker-compose.yml file and comment out (add a `#` to) the lines including and below `s3dep:`.\n\nNavigate to the root directory of the `jpo-s3-depositor` project:\n\n```bash\nmvn clean compile assembly:single install\n```\n\n**Step 4** (Optional)\nFamiliarize yourself with Docker and follow the instructions in the [README.md](docker/README.md).\n\nIf you wish to change the application properties, such as change the location of the upload service via `ode.uploadLocation.*` properties or set the `ode.kafkaBrokers` to something other than the $DOCKER_HOST_IP:9092, or wish to set the CAS username/password, `ODE_EXTERNAL_IPVs`, etc. instead of setting the environment variables, modify `jpo-ode-svcs\\src\\main\\resources\\application.properties` file as desired.\n\n**Step 5**: Navigate to the root directory of the jpo-ode project.\n\n**Step 6**: Build and deploy the application.\n\nThe easiest way to do this is to run the ```clean-build-and-deploy``` script.\nThis script executes the following commands:\n\n```\n#!/bin/bash\ndocker-compose stop\ndocker-compose rm -f -v\nmvn clean install\ndocker-compose up --build -d\ndocker-compose ps\n```\n\nFor other build options, see the next section. Otherwise, move on to section [V. Testing ODE Application](#testing)\n\n[Back to top](#toc)\n\n---\n### Other Build/Deploy Options\n\n#### Building ODE without Deploying\nTo build the ODE docker container images but not deploy it, run the following commands:\n\n```\n cd jpo-ode (or cd ../jpo-ode if you are in any sub-directory)\n mvn clean install\n docker-compose rm -f -v\n docker-compose build\n```\n\nAlternatively, you may run the ```clean-build``` script.\n\n#### Deploying ODE Application on a Docker Host\nTo deploy the the application on the docker host configured in your DOCKER_HOST_IP machine, run the following:\n\n```bash\ndocker-compose up --no-recreate -d\n```\n\n**NOTE**: It's important to run ```docker-compose up``` with ```no-recreate``` option. Otherwise you may run into [this issue] (https://github.com/wurstmeister/kafka-docker/issues/100).\n\nAlternatively, run ```deploy``` script.\n\nCheck the deployment by running ```docker-compose ps```. You can start and stop containers using ```docker-compose start``` and ```docker-compose stop``` commands.\nIf using the multi-broker docker-compose file, you can change the scaling by running ```docker-compose scale <container>=n``` where container is the container you would like to scale and n is the number of instances. For example, ```docker-compose scale kafka=3```.\n\n#### Running ODE Application on localhost\nYou can run the application on your local machine while other services are deployed on a host environment. To do so, run the following:\n```bash\n docker-compose start zookeeper kafka\n java -jar jpo-ode-svcs/target/jpo-ode-svcs-0.0.1-SNAPSHOT.jar\n```\n\n[Back to top](#toc)\n\n<a name=\"testing\"/>\n\n## V. Testing ODE Application\nOnce the ODE is running, you should be able to access the jpo-ode web UI at `localhost:8080`.\n\n1. Press the `Connect` button to connect to the ODE WebSocket service.\n2. Press `Choose File` button to select an OBU log file containing BSMs and/or TIM messages as specified by the WYDOT CV Pilot project. See below documents for details:\na. [Wyoming CV Pilot Log File Design](data/Wyoming_CV_Pilot_Log_File_Design.docx) \nb. [WYDOT Log Records](data/wydotLogRecords.h) \n3. Press `Upload` button to upload the file to ODE.\n\nUpload records within the files must be embedding BSM and/or TIM messages wrapped in J2735 MessageFrame and ASN.1 UPER encoded, wrapped in IEEE 1609.2 envelope and ASN.1 COER encoded binary format. The following files are a samples of each supported type. Uploading any of the files below will you will observe the decoded messages returned to the web UI page while connected to the WebSocket interface:\n\n - [data/bsmLogDuringEvent.bin](data/bsmLogDuringEvent.bin)\n - [data/bsmLogDuringEvent.gz](data/bsmLogDuringEvent.gz)\n - [data/bsmTx.bin](data/bsmTx.bin)\n - [data/bsmTx.gz](data/bsmTx.gz)\n - [data/dnMsg.bin](data/dnMsg.bin)\n - [data/dnMsg.gz](data/dnMsg.gz)\n - [data/rxMsg_BSM.bin](data/rxMsg_BSM.bin)\n - [data/rxMsg_BSM.gz](data/rxMsg_BSM.gz)\n - [data/rxMsg_TIM.bin](data/rxMsg_TIM.bin)\n - [data/rxMsg_TIM.gz](data/rxMsg_TIM.gz)\n\nAnother way data can be uploaded to the ODE is through copying the file to the location specified by the `ode.uploadLocationRoot/ode.uploadLocationObuLog`property. If not specified,  Default locations would be `uploads/bsmlog`sub-directory off of the location where ODE is launched.\n\nThe result of uploading and decoding of messages will be displayed on the UI screen.\n\n![ODE UI](images/ode-ui.png)\n\n*Notice that the empty fields in the J2735 message are represented by a `null` value. Also note that ODE output strips the MessageFrame header and returns a pure BSM or TIM in the subscription topic.*\n\n### asn1_codec Module (ASN.1 Encoder and Decoder)\nODE requires the deployment of asn1_codec module. ODE's `docker-compose.yml` file is set up to build and deploy the module in a Docker container. If you wish to run `asn1_codec` module outside Docker (i.e. directly on the host machine), please refer to the documentation of `asn1_codec` module.\n\nThe only requirement for deploying `asn1_codec` module on Docker is the setup of two environment variables `DOCKER_HOST_IP` and `DOCKER_SHARED_VOLUME`.\n\n### PPM Module (Geofencing and Filtering)\n\nTo run the ODE with PPM module, you must install and start the PPM service. PPM service communicates with other services through Kafka Topics. PPM will read from the specified \"Raw BSM\" topic and publish the result to the specified \"Filtered Bsm\" topic. These topic names are specified by the following ODE and PPM properties:\n\n - ODE properties for communications with PPM (set in application.properties)\n\t - ode.kafkaTopicBsmRawJson  (default = j2735BsmRawJson)\n\t - ode.kafkaTopicBsmFilteredJson (default = j2735BsmFilteredJson)\n - PPM properties for communications with ODE (set in yourconfig.properties)\n\t - privacy.topic.consumer (default = j2735BsmRawJson)\n\t - privacy.topic.producer (default = j2735BsmFilteredJson)\n\nFollow the instructions [here](https://github.com/usdot-jpo-ode/jpo-cvdp/blob/master/docs/installation.md) (https://github.com/usdot-jpo-ode/jpo-cvdp/blob/master/docs/installation.md) to install and build the PPM service.\n\nDuring the build process, edit the sample config file located in `config/example.properties` and point the property `metadata.broker.list` towards the host of your docker machine or wherever the kafka brokers are hosted. You may use the command `docker-machine ls` to find the kafka service.\n\nAfter a successful build, use the following commands to configure and run the PPM\n\n```\ncd $BASE_PPM_DIR/jpo-cvdp/build\n$ ./bsmjson_privacy -c ../config/ppm.properties\n```\nWith the PPM module running, all filtered BSMs that are uploaded through the web interface will be captured and processed. You will see an output of both submitted BSM and processed data unless the entire record was filtered out.\n\n![PPM](images/PPM.png)\n\n\n[Back to top](#toc)\n\n<a name=\"ode-limitation\"/>\n\n## VI. ODE Limitations\n\nDate: 07/2017\n\nIn its current state, the ODE has been developed to accomplish the goals of data transfer, security, and modularity working with the J2735 and 1609.2 security. The system has been designed to support multiple services orchestrated through the Apache Kafka streaming data pipelines, services built and supported as separate applications and described with each service's repository. As a modular system, each component has been built for functionality first, and additional performance testing is needed to understand the limits of the system with large volumes of data.\n\n<a name=\"dev-tools\"/>\n\n## VII. Development Tools\n\n### Integrated Development Environment (IDE)\n\nInstall the IDE of your choice:\n\n* Eclipse: [https://eclipse.org/](https://eclipse.org/)\n* STS: [https://spring.io/tools/sts/all](https://spring.io/tools/sts/all)\n* IntelliJ: [https://www.jetbrains.com/idea/](https://www.jetbrains.com/idea/)\n\n### Continuous Integration and Delivery\n\nTo be added.\n\n### Continous Deployment\n\nTo be added.\n\n<a name=\"contribution-info\"/>\n\n## VIII. Contribution Information\n\nPlease read our [contributing guide](docs/contributing_guide.md) to learn about our development process, how to propose pull requests and improvements, and how to build and test your changes to this project.\n\n<a name=\"troubleshooting\"/>\n\n## IX. Troubleshooting\n\nPlease read our [Wiki](https://github.com/usdot-jpo-ode/jpo-ode/wiki) for more information, or check the [ODE User Guide](https://github.com/usdot-jpo-ode/jpo-ode/raw/develop/docs/JPO_ODE_UserGuide.docx).\n\n[Back to top](#toc)\n",
    "contributors": 9,
    "contributors_list": [
      {
        "avatar_url": "https://avatars0.githubusercontent.com/u/12912578?v=4",
        "profile_url": "https://github.com/mvs5465",
        "user_type": "User",
        "username": "mvs5465"
      },
      {
        "avatar_url": "https://avatars2.githubusercontent.com/u/10130982?v=4",
        "profile_url": "https://github.com/hmusavi",
        "user_type": "User",
        "username": "hmusavi"
      },
      {
        "avatar_url": "https://avatars0.githubusercontent.com/u/23481864?v=4",
        "profile_url": "https://github.com/mgarramo",
        "user_type": "User",
        "username": "mgarramo"
      },
      {
        "avatar_url": "https://avatars0.githubusercontent.com/u/9087336?v=4",
        "profile_url": "https://github.com/0111sandesh",
        "user_type": "User",
        "username": "0111sandesh"
      },
      {
        "avatar_url": "https://avatars0.githubusercontent.com/u/549261?v=4",
        "profile_url": "https://github.com/tonychen091",
        "user_type": "User",
        "username": "tonychen091"
      },
      {
        "avatar_url": "https://avatars0.githubusercontent.com/u/29639608?v=4",
        "profile_url": "https://github.com/levesque1",
        "user_type": "User",
        "username": "levesque1"
      },
      {
        "avatar_url": "https://avatars2.githubusercontent.com/u/5840989?v=4",
        "profile_url": "https://github.com/lauraGgit",
        "user_type": "User",
        "username": "lauraGgit"
      },
      {
        "avatar_url": "https://avatars2.githubusercontent.com/u/23216443?v=4",
        "profile_url": "https://github.com/ToryB1",
        "user_type": "User",
        "username": "ToryB1"
      },
      {
        "avatar_url": "https://avatars2.githubusercontent.com/u/1664694?v=4",
        "profile_url": "https://github.com/southernsun",
        "user_type": "User",
        "username": "southernsun"
      }
    ],
    "stars": 26,
    "watchers": 19,
    "releases": 0,
    "rank": 2501,
    "repositoryUrl": "https://github.com/usdot-jpo-ode/jpo-ode",
    "updatedAt": "2018-11-14T20:55:31Z",
    "id": "23056647_72044729",
    "downloads": 10
  }
];