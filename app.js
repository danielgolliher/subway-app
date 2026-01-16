// NYC Subway Arrival Times App
// Uses MTA GTFS-RT feeds

// Station data for all subway lines
const STATIONS = {
    "L": [
        { id: "L01", name: "8 Av", borough: "Manhattan" },
        { id: "L02", name: "6 Av", borough: "Manhattan" },
        { id: "L03", name: "Union Sq - 14 St", borough: "Manhattan" },
        { id: "L05", name: "3 Av", borough: "Manhattan" },
        { id: "L06", name: "1 Av", borough: "Manhattan" },
        { id: "L08", name: "Bedford Av", borough: "Brooklyn" },
        { id: "L10", name: "Lorimer St", borough: "Brooklyn" },
        { id: "L11", name: "Graham Av", borough: "Brooklyn" },
        { id: "L12", name: "Grand St", borough: "Brooklyn" },
        { id: "L13", name: "Montrose Av", borough: "Brooklyn" },
        { id: "L14", name: "Morgan Av", borough: "Brooklyn" },
        { id: "L15", name: "Jefferson St", borough: "Brooklyn" },
        { id: "L16", name: "DeKalb Av", borough: "Brooklyn" },
        { id: "L17", name: "Myrtle - Wyckoff Avs", borough: "Brooklyn" },
        { id: "L19", name: "Halsey St", borough: "Brooklyn" },
        { id: "L20", name: "Wilson Av", borough: "Brooklyn" },
        { id: "L21", name: "Bushwick Av - Aberdeen St", borough: "Brooklyn" },
        { id: "L22", name: "Broadway Junction", borough: "Brooklyn" },
        { id: "L24", name: "Atlantic Av", borough: "Brooklyn" },
        { id: "L25", name: "Sutter Av", borough: "Brooklyn" },
        { id: "L26", name: "Livonia Av", borough: "Brooklyn" },
        { id: "L27", name: "New Lots Av", borough: "Brooklyn" },
        { id: "L28", name: "East 105 St", borough: "Brooklyn" },
        { id: "L29", name: "Canarsie - Rockaway Pkwy", borough: "Brooklyn" }
    ],
    "1": [
        { id: "101", name: "Van Cortlandt Park - 242 St", borough: "Bronx" },
        { id: "103", name: "238 St", borough: "Bronx" },
        { id: "104", name: "231 St", borough: "Bronx" },
        { id: "106", name: "Marble Hill - 225 St", borough: "Bronx" },
        { id: "107", name: "215 St", borough: "Manhattan" },
        { id: "108", name: "207 St", borough: "Manhattan" },
        { id: "109", name: "Dyckman St", borough: "Manhattan" },
        { id: "110", name: "191 St", borough: "Manhattan" },
        { id: "111", name: "181 St", borough: "Manhattan" },
        { id: "112", name: "168 St", borough: "Manhattan" },
        { id: "113", name: "157 St", borough: "Manhattan" },
        { id: "114", name: "145 St", borough: "Manhattan" },
        { id: "115", name: "137 St - City College", borough: "Manhattan" },
        { id: "116", name: "125 St", borough: "Manhattan" },
        { id: "117", name: "116 St - Columbia University", borough: "Manhattan" },
        { id: "118", name: "Cathedral Pkwy (110 St)", borough: "Manhattan" },
        { id: "119", name: "103 St", borough: "Manhattan" },
        { id: "120", name: "96 St", borough: "Manhattan" },
        { id: "121", name: "86 St", borough: "Manhattan" },
        { id: "122", name: "79 St", borough: "Manhattan" },
        { id: "123", name: "72 St", borough: "Manhattan" },
        { id: "124", name: "66 St - Lincoln Center", borough: "Manhattan" },
        { id: "125", name: "59 St - Columbus Circle", borough: "Manhattan" },
        { id: "126", name: "50 St", borough: "Manhattan" },
        { id: "127", name: "Times Sq - 42 St", borough: "Manhattan" },
        { id: "128", name: "34 St - Penn Station", borough: "Manhattan" },
        { id: "129", name: "28 St", borough: "Manhattan" },
        { id: "130", name: "23 St", borough: "Manhattan" },
        { id: "131", name: "18 St", borough: "Manhattan" },
        { id: "132", name: "14 St", borough: "Manhattan" },
        { id: "133", name: "Christopher St - Sheridan Sq", borough: "Manhattan" },
        { id: "134", name: "Houston St", borough: "Manhattan" },
        { id: "135", name: "Canal St", borough: "Manhattan" },
        { id: "136", name: "Franklin St", borough: "Manhattan" },
        { id: "137", name: "Chambers St", borough: "Manhattan" },
        { id: "138", name: "Cortlandt St", borough: "Manhattan" },
        { id: "139", name: "Rector St", borough: "Manhattan" },
        { id: "140", name: "South Ferry", borough: "Manhattan" }
    ],
    "2": [
        { id: "201", name: "Wakefield - 241 St", borough: "Bronx" },
        { id: "204", name: "Nereid Av", borough: "Bronx" },
        { id: "205", name: "233 St", borough: "Bronx" },
        { id: "206", name: "225 St", borough: "Bronx" },
        { id: "207", name: "219 St", borough: "Bronx" },
        { id: "208", name: "Gun Hill Rd", borough: "Bronx" },
        { id: "209", name: "Burke Av", borough: "Bronx" },
        { id: "210", name: "Allerton Av", borough: "Bronx" },
        { id: "211", name: "Pelham Pkwy", borough: "Bronx" },
        { id: "212", name: "Bronx Park East", borough: "Bronx" },
        { id: "213", name: "E 180 St", borough: "Bronx" },
        { id: "214", name: "West Farms Sq - E Tremont Av", borough: "Bronx" },
        { id: "215", name: "174 St", borough: "Bronx" },
        { id: "216", name: "Freeman St", borough: "Bronx" },
        { id: "217", name: "Simpson St", borough: "Bronx" },
        { id: "218", name: "Intervale Av", borough: "Bronx" },
        { id: "219", name: "Prospect Av", borough: "Bronx" },
        { id: "220", name: "Jackson Av", borough: "Bronx" },
        { id: "221", name: "3 Av - 149 St", borough: "Bronx" },
        { id: "222", name: "149 St - Grand Concourse", borough: "Bronx" },
        { id: "224", name: "135 St", borough: "Manhattan" },
        { id: "225", name: "125 St", borough: "Manhattan" },
        { id: "226", name: "116 St", borough: "Manhattan" },
        { id: "227", name: "Central Park North (110 St)", borough: "Manhattan" },
        { id: "228", name: "96 St", borough: "Manhattan" },
        { id: "229", name: "72 St", borough: "Manhattan" },
        { id: "230", name: "Times Sq - 42 St", borough: "Manhattan" },
        { id: "231", name: "34 St - Penn Station", borough: "Manhattan" },
        { id: "232", name: "14 St", borough: "Manhattan" },
        { id: "233", name: "Chambers St", borough: "Manhattan" },
        { id: "234", name: "Fulton St", borough: "Manhattan" },
        { id: "235", name: "Wall St", borough: "Manhattan" },
        { id: "236", name: "Clark St", borough: "Brooklyn" },
        { id: "237", name: "Borough Hall", borough: "Brooklyn" },
        { id: "238", name: "Hoyt St", borough: "Brooklyn" },
        { id: "239", name: "Nevins St", borough: "Brooklyn" },
        { id: "241", name: "Atlantic Av - Barclays Ctr", borough: "Brooklyn" },
        { id: "242", name: "Bergen St", borough: "Brooklyn" },
        { id: "243", name: "Grand Army Plaza", borough: "Brooklyn" },
        { id: "244", name: "Eastern Pkwy - Brooklyn Museum", borough: "Brooklyn" },
        { id: "245", name: "Franklin Av - Medgar Evers College", borough: "Brooklyn" },
        { id: "246", name: "President St - Medgar Evers College", borough: "Brooklyn" },
        { id: "247", name: "Sterling St", borough: "Brooklyn" },
        { id: "248", name: "Winthrop St", borough: "Brooklyn" },
        { id: "249", name: "Church Av", borough: "Brooklyn" },
        { id: "250", name: "Beverly Rd", borough: "Brooklyn" },
        { id: "251", name: "Newkirk Av - Little Haiti", borough: "Brooklyn" },
        { id: "252", name: "Flatbush Av - Brooklyn College", borough: "Brooklyn" }
    ],
    "3": [
        { id: "301", name: "Harlem - 148 St", borough: "Manhattan" },
        { id: "302", name: "145 St", borough: "Manhattan" },
        { id: "224", name: "135 St", borough: "Manhattan" },
        { id: "225", name: "125 St", borough: "Manhattan" },
        { id: "226", name: "116 St", borough: "Manhattan" },
        { id: "227", name: "Central Park North (110 St)", borough: "Manhattan" },
        { id: "228", name: "96 St", borough: "Manhattan" },
        { id: "229", name: "72 St", borough: "Manhattan" },
        { id: "230", name: "Times Sq - 42 St", borough: "Manhattan" },
        { id: "231", name: "34 St - Penn Station", borough: "Manhattan" },
        { id: "232", name: "14 St", borough: "Manhattan" },
        { id: "233", name: "Chambers St", borough: "Manhattan" },
        { id: "234", name: "Fulton St", borough: "Manhattan" },
        { id: "235", name: "Wall St", borough: "Manhattan" },
        { id: "236", name: "Clark St", borough: "Brooklyn" },
        { id: "237", name: "Borough Hall", borough: "Brooklyn" },
        { id: "238", name: "Hoyt St", borough: "Brooklyn" },
        { id: "239", name: "Nevins St", borough: "Brooklyn" },
        { id: "241", name: "Atlantic Av - Barclays Ctr", borough: "Brooklyn" },
        { id: "242", name: "Bergen St", borough: "Brooklyn" },
        { id: "243", name: "Grand Army Plaza", borough: "Brooklyn" },
        { id: "244", name: "Eastern Pkwy - Brooklyn Museum", borough: "Brooklyn" },
        { id: "245", name: "Franklin Av - Medgar Evers College", borough: "Brooklyn" },
        { id: "246", name: "President St - Medgar Evers College", borough: "Brooklyn" },
        { id: "247", name: "Sterling St", borough: "Brooklyn" },
        { id: "248", name: "Winthrop St", borough: "Brooklyn" },
        { id: "249", name: "Church Av", borough: "Brooklyn" },
        { id: "250", name: "Beverly Rd", borough: "Brooklyn" },
        { id: "251", name: "Newkirk Av - Little Haiti", borough: "Brooklyn" },
        { id: "252", name: "Flatbush Av - Brooklyn College", borough: "Brooklyn" },
        { id: "253", name: "Nostrand Av", borough: "Brooklyn" },
        { id: "254", name: "Kingston Av", borough: "Brooklyn" },
        { id: "255", name: "Crown Hts - Utica Av", borough: "Brooklyn" },
        { id: "256", name: "Sutter Av - Rutland Rd", borough: "Brooklyn" },
        { id: "257", name: "Saratoga Av", borough: "Brooklyn" },
        { id: "258", name: "Rockaway Av", borough: "Brooklyn" },
        { id: "259", name: "Junius St", borough: "Brooklyn" },
        { id: "260", name: "Pennsylvania Av", borough: "Brooklyn" },
        { id: "261", name: "Van Siclen Av", borough: "Brooklyn" },
        { id: "262", name: "New Lots Av", borough: "Brooklyn" }
    ],
    "4": [
        { id: "401", name: "Woodlawn", borough: "Bronx" },
        { id: "402", name: "Mosholu Pkwy", borough: "Bronx" },
        { id: "405", name: "Bedford Park Blvd - Lehman College", borough: "Bronx" },
        { id: "406", name: "Kingsbridge Rd", borough: "Bronx" },
        { id: "407", name: "Fordham Rd", borough: "Bronx" },
        { id: "408", name: "183 St", borough: "Bronx" },
        { id: "409", name: "Burnside Av", borough: "Bronx" },
        { id: "410", name: "176 St", borough: "Bronx" },
        { id: "411", name: "Mt Eden Av", borough: "Bronx" },
        { id: "412", name: "170 St", borough: "Bronx" },
        { id: "413", name: "167 St", borough: "Bronx" },
        { id: "414", name: "161 St - Yankee Stadium", borough: "Bronx" },
        { id: "415", name: "149 St - Grand Concourse", borough: "Bronx" },
        { id: "416", name: "138 St - Grand Concourse", borough: "Bronx" },
        { id: "417", name: "125 St", borough: "Manhattan" },
        { id: "418", name: "86 St", borough: "Manhattan" },
        { id: "419", name: "59 St", borough: "Manhattan" },
        { id: "420", name: "Grand Central - 42 St", borough: "Manhattan" },
        { id: "421", name: "14 St - Union Sq", borough: "Manhattan" },
        { id: "422", name: "Brooklyn Bridge - City Hall", borough: "Manhattan" },
        { id: "423", name: "Fulton St", borough: "Manhattan" },
        { id: "424", name: "Wall St", borough: "Manhattan" },
        { id: "425", name: "Bowling Green", borough: "Manhattan" },
        { id: "426", name: "Borough Hall", borough: "Brooklyn" },
        { id: "427", name: "Nevins St", borough: "Brooklyn" },
        { id: "428", name: "Atlantic Av - Barclays Ctr", borough: "Brooklyn" },
        { id: "429", name: "Franklin Av - Medgar Evers College", borough: "Brooklyn" },
        { id: "430", name: "Crown Hts - Utica Av", borough: "Brooklyn" }
    ],
    "5": [
        { id: "501", name: "Eastchester - Dyre Av", borough: "Bronx" },
        { id: "502", name: "Baychester Av", borough: "Bronx" },
        { id: "503", name: "Gun Hill Rd", borough: "Bronx" },
        { id: "504", name: "Pelham Pkwy", borough: "Bronx" },
        { id: "505", name: "Morris Park", borough: "Bronx" },
        { id: "213", name: "E 180 St", borough: "Bronx" },
        { id: "214", name: "West Farms Sq - E Tremont Av", borough: "Bronx" },
        { id: "215", name: "174 St", borough: "Bronx" },
        { id: "216", name: "Freeman St", borough: "Bronx" },
        { id: "217", name: "Simpson St", borough: "Bronx" },
        { id: "218", name: "Intervale Av", borough: "Bronx" },
        { id: "219", name: "Prospect Av", borough: "Bronx" },
        { id: "220", name: "Jackson Av", borough: "Bronx" },
        { id: "221", name: "3 Av - 149 St", borough: "Bronx" },
        { id: "222", name: "149 St - Grand Concourse", borough: "Bronx" },
        { id: "416", name: "138 St - Grand Concourse", borough: "Bronx" },
        { id: "417", name: "125 St", borough: "Manhattan" },
        { id: "418", name: "86 St", borough: "Manhattan" },
        { id: "419", name: "59 St", borough: "Manhattan" },
        { id: "420", name: "Grand Central - 42 St", borough: "Manhattan" },
        { id: "421", name: "14 St - Union Sq", borough: "Manhattan" },
        { id: "422", name: "Brooklyn Bridge - City Hall", borough: "Manhattan" },
        { id: "423", name: "Fulton St", borough: "Manhattan" },
        { id: "424", name: "Wall St", borough: "Manhattan" },
        { id: "425", name: "Bowling Green", borough: "Manhattan" },
        { id: "426", name: "Borough Hall", borough: "Brooklyn" },
        { id: "427", name: "Nevins St", borough: "Brooklyn" },
        { id: "428", name: "Atlantic Av - Barclays Ctr", borough: "Brooklyn" },
        { id: "429", name: "Franklin Av - Medgar Evers College", borough: "Brooklyn" },
        { id: "430", name: "Crown Hts - Utica Av", borough: "Brooklyn" },
        { id: "241", name: "Atlantic Av - Barclays Ctr", borough: "Brooklyn" },
        { id: "248", name: "Winthrop St", borough: "Brooklyn" },
        { id: "252", name: "Flatbush Av - Brooklyn College", borough: "Brooklyn" }
    ],
    "6": [
        { id: "601", name: "Pelham Bay Park", borough: "Bronx" },
        { id: "602", name: "Buhre Av", borough: "Bronx" },
        { id: "603", name: "Middletown Rd", borough: "Bronx" },
        { id: "604", name: "Westchester Sq - E Tremont Av", borough: "Bronx" },
        { id: "606", name: "Zerega Av", borough: "Bronx" },
        { id: "607", name: "Castle Hill Av", borough: "Bronx" },
        { id: "608", name: "Parkchester", borough: "Bronx" },
        { id: "609", name: "St Lawrence Av", borough: "Bronx" },
        { id: "610", name: "Morrison Av - Soundview", borough: "Bronx" },
        { id: "611", name: "Elder Av", borough: "Bronx" },
        { id: "612", name: "Whitlock Av", borough: "Bronx" },
        { id: "613", name: "Hunts Point Av", borough: "Bronx" },
        { id: "614", name: "Longwood Av", borough: "Bronx" },
        { id: "615", name: "E 149 St", borough: "Bronx" },
        { id: "616", name: "E 143 St - St Mary's St", borough: "Bronx" },
        { id: "617", name: "Cypress Av", borough: "Bronx" },
        { id: "618", name: "Brook Av", borough: "Bronx" },
        { id: "619", name: "3 Av - 138 St", borough: "Bronx" },
        { id: "621", name: "125 St", borough: "Manhattan" },
        { id: "622", name: "116 St", borough: "Manhattan" },
        { id: "623", name: "110 St", borough: "Manhattan" },
        { id: "624", name: "103 St", borough: "Manhattan" },
        { id: "625", name: "96 St", borough: "Manhattan" },
        { id: "626", name: "86 St", borough: "Manhattan" },
        { id: "627", name: "77 St", borough: "Manhattan" },
        { id: "628", name: "68 St - Hunter College", borough: "Manhattan" },
        { id: "629", name: "59 St", borough: "Manhattan" },
        { id: "630", name: "51 St", borough: "Manhattan" },
        { id: "631", name: "Grand Central - 42 St", borough: "Manhattan" },
        { id: "632", name: "33 St", borough: "Manhattan" },
        { id: "633", name: "28 St", borough: "Manhattan" },
        { id: "634", name: "23 St", borough: "Manhattan" },
        { id: "635", name: "14 St - Union Sq", borough: "Manhattan" },
        { id: "636", name: "Astor Pl", borough: "Manhattan" },
        { id: "637", name: "Bleecker St", borough: "Manhattan" },
        { id: "638", name: "Spring St", borough: "Manhattan" },
        { id: "639", name: "Canal St", borough: "Manhattan" },
        { id: "640", name: "Brooklyn Bridge - City Hall", borough: "Manhattan" }
    ],
    "7": [
        { id: "701", name: "Flushing - Main St", borough: "Queens" },
        { id: "702", name: "Mets - Willets Point", borough: "Queens" },
        { id: "705", name: "111 St", borough: "Queens" },
        { id: "706", name: "103 St - Corona Plaza", borough: "Queens" },
        { id: "707", name: "Junction Blvd", borough: "Queens" },
        { id: "708", name: "90 St - Elmhurst Av", borough: "Queens" },
        { id: "709", name: "82 St - Jackson Hts", borough: "Queens" },
        { id: "710", name: "74 St - Broadway", borough: "Queens" },
        { id: "711", name: "69 St", borough: "Queens" },
        { id: "712", name: "Woodside - 61 St", borough: "Queens" },
        { id: "713", name: "52 St", borough: "Queens" },
        { id: "714", name: "46 St - Bliss St", borough: "Queens" },
        { id: "715", name: "40 St - Lowery St", borough: "Queens" },
        { id: "716", name: "33 St - Rawson St", borough: "Queens" },
        { id: "718", name: "Queensboro Plaza", borough: "Queens" },
        { id: "719", name: "Court Sq", borough: "Queens" },
        { id: "720", name: "Hunters Point Av", borough: "Queens" },
        { id: "721", name: "Vernon Blvd - Jackson Av", borough: "Queens" },
        { id: "723", name: "Grand Central - 42 St", borough: "Manhattan" },
        { id: "724", name: "5 Av", borough: "Manhattan" },
        { id: "725", name: "Times Sq - 42 St", borough: "Manhattan" },
        { id: "726", name: "34 St - Hudson Yards", borough: "Manhattan" }
    ],
    "A": [
        { id: "A02", name: "Inwood - 207 St", borough: "Manhattan" },
        { id: "A03", name: "Dyckman St", borough: "Manhattan" },
        { id: "A05", name: "190 St", borough: "Manhattan" },
        { id: "A06", name: "181 St", borough: "Manhattan" },
        { id: "A07", name: "175 St", borough: "Manhattan" },
        { id: "A09", name: "168 St", borough: "Manhattan" },
        { id: "A10", name: "163 St - Amsterdam Av", borough: "Manhattan" },
        { id: "A11", name: "155 St", borough: "Manhattan" },
        { id: "A12", name: "145 St", borough: "Manhattan" },
        { id: "A14", name: "125 St", borough: "Manhattan" },
        { id: "A15", name: "59 St - Columbus Circle", borough: "Manhattan" },
        { id: "A16", name: "42 St - Port Authority Bus Terminal", borough: "Manhattan" },
        { id: "A17", name: "34 St - Penn Station", borough: "Manhattan" },
        { id: "A18", name: "14 St", borough: "Manhattan" },
        { id: "A19", name: "W 4 St - Wash Sq", borough: "Manhattan" },
        { id: "A20", name: "Spring St", borough: "Manhattan" },
        { id: "A21", name: "Canal St", borough: "Manhattan" },
        { id: "A22", name: "Chambers St", borough: "Manhattan" },
        { id: "A24", name: "Fulton St", borough: "Manhattan" },
        { id: "A25", name: "High St", borough: "Brooklyn" },
        { id: "A27", name: "Jay St - MetroTech", borough: "Brooklyn" },
        { id: "A28", name: "Hoyt - Schermerhorn Sts", borough: "Brooklyn" },
        { id: "A30", name: "Lafayette Av", borough: "Brooklyn" },
        { id: "A31", name: "Clinton - Washington Avs", borough: "Brooklyn" },
        { id: "A32", name: "Franklin Av", borough: "Brooklyn" },
        { id: "A33", name: "Nostrand Av", borough: "Brooklyn" },
        { id: "A34", name: "Kingston - Throop Avs", borough: "Brooklyn" },
        { id: "A36", name: "Utica Av", borough: "Brooklyn" },
        { id: "A38", name: "Ralph Av", borough: "Brooklyn" },
        { id: "A40", name: "Rockaway Av", borough: "Brooklyn" },
        { id: "A41", name: "Broadway Junction", borough: "Brooklyn" },
        { id: "A42", name: "Liberty Av", borough: "Brooklyn" },
        { id: "A43", name: "Van Siclen Av", borough: "Brooklyn" },
        { id: "A44", name: "Shepherd Av", borough: "Brooklyn" },
        { id: "A45", name: "Euclid Av", borough: "Brooklyn" },
        { id: "A46", name: "Grant Av", borough: "Brooklyn" },
        { id: "A47", name: "80 St", borough: "Queens" },
        { id: "A48", name: "88 St", borough: "Queens" },
        { id: "A49", name: "Rockaway Blvd", borough: "Queens" },
        { id: "A50", name: "104 St", borough: "Queens" },
        { id: "A51", name: "111 St", borough: "Queens" },
        { id: "A52", name: "Ozone Park - Lefferts Blvd", borough: "Queens" },
        { id: "A55", name: "Aqueduct Racetrack", borough: "Queens" },
        { id: "A57", name: "Howard Beach - JFK Airport", borough: "Queens" },
        { id: "A59", name: "Broad Channel", borough: "Queens" },
        { id: "A60", name: "Beach 90 St", borough: "Queens" },
        { id: "A61", name: "Beach 98 St", borough: "Queens" },
        { id: "A63", name: "Beach 105 St", borough: "Queens" },
        { id: "A64", name: "Rockaway Park - Beach 116 St", borough: "Queens" },
        { id: "A65", name: "Far Rockaway - Mott Av", borough: "Queens" }
    ],
    "C": [
        { id: "A09", name: "168 St", borough: "Manhattan" },
        { id: "A10", name: "163 St - Amsterdam Av", borough: "Manhattan" },
        { id: "A11", name: "155 St", borough: "Manhattan" },
        { id: "A12", name: "145 St", borough: "Manhattan" },
        { id: "A14", name: "125 St", borough: "Manhattan" },
        { id: "A15", name: "59 St - Columbus Circle", borough: "Manhattan" },
        { id: "A16", name: "42 St - Port Authority Bus Terminal", borough: "Manhattan" },
        { id: "A17", name: "34 St - Penn Station", borough: "Manhattan" },
        { id: "A18", name: "14 St", borough: "Manhattan" },
        { id: "A19", name: "W 4 St - Wash Sq", borough: "Manhattan" },
        { id: "A20", name: "Spring St", borough: "Manhattan" },
        { id: "A21", name: "Canal St", borough: "Manhattan" },
        { id: "A22", name: "Chambers St", borough: "Manhattan" },
        { id: "A24", name: "Fulton St", borough: "Manhattan" },
        { id: "A25", name: "High St", borough: "Brooklyn" },
        { id: "A27", name: "Jay St - MetroTech", borough: "Brooklyn" },
        { id: "A28", name: "Hoyt - Schermerhorn Sts", borough: "Brooklyn" },
        { id: "A30", name: "Lafayette Av", borough: "Brooklyn" },
        { id: "A31", name: "Clinton - Washington Avs", borough: "Brooklyn" },
        { id: "A32", name: "Franklin Av", borough: "Brooklyn" },
        { id: "A33", name: "Nostrand Av", borough: "Brooklyn" },
        { id: "A34", name: "Kingston - Throop Avs", borough: "Brooklyn" },
        { id: "A36", name: "Utica Av", borough: "Brooklyn" },
        { id: "A38", name: "Ralph Av", borough: "Brooklyn" },
        { id: "A40", name: "Rockaway Av", borough: "Brooklyn" },
        { id: "A41", name: "Broadway Junction", borough: "Brooklyn" },
        { id: "A42", name: "Liberty Av", borough: "Brooklyn" },
        { id: "A43", name: "Van Siclen Av", borough: "Brooklyn" },
        { id: "A44", name: "Shepherd Av", borough: "Brooklyn" },
        { id: "A45", name: "Euclid Av", borough: "Brooklyn" }
    ],
    "E": [
        { id: "E01", name: "Jamaica Center - Parsons/Archer", borough: "Queens" },
        { id: "G05", name: "Sutphin Blvd - Archer Av - JFK Airport", borough: "Queens" },
        { id: "G06", name: "Jamaica - Van Wyck", borough: "Queens" },
        { id: "G08", name: "Briarwood", borough: "Queens" },
        { id: "G09", name: "Kew Gardens - Union Tpke", borough: "Queens" },
        { id: "G10", name: "75 Av", borough: "Queens" },
        { id: "G11", name: "Forest Hills - 71 Av", borough: "Queens" },
        { id: "G12", name: "67 Av", borough: "Queens" },
        { id: "G13", name: "63 Dr - Rego Park", borough: "Queens" },
        { id: "G14", name: "Woodhaven Blvd", borough: "Queens" },
        { id: "G15", name: "Grand Av - Newtown", borough: "Queens" },
        { id: "G16", name: "Elmhurst Av", borough: "Queens" },
        { id: "G18", name: "Jackson Hts - Roosevelt Av", borough: "Queens" },
        { id: "G19", name: "65 St", borough: "Queens" },
        { id: "G20", name: "Northern Blvd", borough: "Queens" },
        { id: "G21", name: "46 St", borough: "Queens" },
        { id: "G22", name: "Steinway St", borough: "Queens" },
        { id: "G24", name: "36 St", borough: "Queens" },
        { id: "D14", name: "Queens Plaza", borough: "Queens" },
        { id: "D15", name: "Court Sq - 23 St", borough: "Queens" },
        { id: "D16", name: "Lexington Av/53 St", borough: "Manhattan" },
        { id: "D17", name: "5 Av/53 St", borough: "Manhattan" },
        { id: "D18", name: "7 Av", borough: "Manhattan" },
        { id: "A16", name: "42 St - Port Authority Bus Terminal", borough: "Manhattan" },
        { id: "A17", name: "34 St - Penn Station", borough: "Manhattan" },
        { id: "A18", name: "14 St", borough: "Manhattan" },
        { id: "A19", name: "W 4 St - Wash Sq", borough: "Manhattan" },
        { id: "A20", name: "Spring St", borough: "Manhattan" },
        { id: "A21", name: "Canal St", borough: "Manhattan" },
        { id: "E01", name: "World Trade Center", borough: "Manhattan" }
    ],
    "B": [
        { id: "D01", name: "145 St", borough: "Manhattan" },
        { id: "D03", name: "135 St", borough: "Manhattan" },
        { id: "D04", name: "125 St", borough: "Manhattan" },
        { id: "D05", name: "116 St", borough: "Manhattan" },
        { id: "D06", name: "Cathedral Pkwy (110 St)", borough: "Manhattan" },
        { id: "D07", name: "103 St", borough: "Manhattan" },
        { id: "D08", name: "96 St", borough: "Manhattan" },
        { id: "D09", name: "86 St", borough: "Manhattan" },
        { id: "D10", name: "81 St - Museum of Natural History", borough: "Manhattan" },
        { id: "D11", name: "72 St", borough: "Manhattan" },
        { id: "D12", name: "59 St - Columbus Circle", borough: "Manhattan" },
        { id: "D13", name: "7 Av", borough: "Manhattan" },
        { id: "D14", name: "47-50 Sts - Rockefeller Ctr", borough: "Manhattan" },
        { id: "D15", name: "42 St - Bryant Park", borough: "Manhattan" },
        { id: "D16", name: "34 St - Herald Sq", borough: "Manhattan" },
        { id: "D17", name: "W 4 St - Wash Sq", borough: "Manhattan" },
        { id: "D18", name: "Broadway - Lafayette St", borough: "Manhattan" },
        { id: "D19", name: "Grand St", borough: "Manhattan" },
        { id: "D20", name: "DeKalb Av", borough: "Brooklyn" },
        { id: "D21", name: "Atlantic Av - Barclays Ctr", borough: "Brooklyn" },
        { id: "D22", name: "7 Av", borough: "Brooklyn" },
        { id: "D24", name: "Prospect Park", borough: "Brooklyn" },
        { id: "D25", name: "Church Av", borough: "Brooklyn" },
        { id: "D26", name: "Beverly Rd", borough: "Brooklyn" },
        { id: "D27", name: "Cortelyou Rd", borough: "Brooklyn" },
        { id: "D28", name: "Newkirk Plaza", borough: "Brooklyn" },
        { id: "D29", name: "Avenue H", borough: "Brooklyn" },
        { id: "D30", name: "Avenue J", borough: "Brooklyn" },
        { id: "D31", name: "Avenue M", borough: "Brooklyn" },
        { id: "D32", name: "Kings Hwy", borough: "Brooklyn" },
        { id: "D33", name: "Avenue U", borough: "Brooklyn" },
        { id: "D34", name: "Neck Rd", borough: "Brooklyn" },
        { id: "D35", name: "Sheepshead Bay", borough: "Brooklyn" },
        { id: "D39", name: "Brighton Beach", borough: "Brooklyn" },
        { id: "D40", name: "Ocean Pkwy", borough: "Brooklyn" },
        { id: "D41", name: "W 8 St - NY Aquarium", borough: "Brooklyn" },
        { id: "D42", name: "Coney Island - Stillwell Av", borough: "Brooklyn" }
    ],
    "D": [
        { id: "D01", name: "Norwood - 205 St", borough: "Bronx" },
        { id: "D03", name: "Bedford Park Blvd", borough: "Bronx" },
        { id: "D04", name: "Kingsbridge Rd", borough: "Bronx" },
        { id: "D05", name: "Fordham Rd", borough: "Bronx" },
        { id: "D06", name: "182-183 Sts", borough: "Bronx" },
        { id: "D07", name: "Tremont Av", borough: "Bronx" },
        { id: "D08", name: "174-175 Sts", borough: "Bronx" },
        { id: "D09", name: "170 St", borough: "Bronx" },
        { id: "D10", name: "167 St", borough: "Bronx" },
        { id: "D11", name: "161 St - Yankee Stadium", borough: "Bronx" },
        { id: "D12", name: "155 St", borough: "Bronx" },
        { id: "D13", name: "145 St", borough: "Manhattan" },
        { id: "D14", name: "125 St", borough: "Manhattan" },
        { id: "D15", name: "59 St - Columbus Circle", borough: "Manhattan" },
        { id: "D16", name: "7 Av", borough: "Manhattan" },
        { id: "D17", name: "47-50 Sts - Rockefeller Ctr", borough: "Manhattan" },
        { id: "D18", name: "42 St - Bryant Park", borough: "Manhattan" },
        { id: "D19", name: "34 St - Herald Sq", borough: "Manhattan" },
        { id: "D20", name: "W 4 St - Wash Sq", borough: "Manhattan" },
        { id: "D21", name: "Broadway - Lafayette St", borough: "Manhattan" },
        { id: "D22", name: "Grand St", borough: "Manhattan" },
        { id: "D24", name: "DeKalb Av", borough: "Brooklyn" },
        { id: "D25", name: "Atlantic Av - Barclays Ctr", borough: "Brooklyn" },
        { id: "D26", name: "36 St", borough: "Brooklyn" },
        { id: "D28", name: "9 Av", borough: "Brooklyn" },
        { id: "D29", name: "Fort Hamilton Pkwy", borough: "Brooklyn" },
        { id: "D30", name: "50 St", borough: "Brooklyn" },
        { id: "D31", name: "55 St", borough: "Brooklyn" },
        { id: "D32", name: "62 St", borough: "Brooklyn" },
        { id: "D33", name: "71 St", borough: "Brooklyn" },
        { id: "D34", name: "79 St", borough: "Brooklyn" },
        { id: "D35", name: "18 Av", borough: "Brooklyn" },
        { id: "D37", name: "20 Av", borough: "Brooklyn" },
        { id: "D38", name: "Bay Pkwy", borough: "Brooklyn" },
        { id: "D39", name: "25 Av", borough: "Brooklyn" },
        { id: "D40", name: "Bay 50 St", borough: "Brooklyn" },
        { id: "D42", name: "Coney Island - Stillwell Av", borough: "Brooklyn" }
    ],
    "F": [
        { id: "F01", name: "Jamaica - 179 St", borough: "Queens" },
        { id: "F02", name: "169 St", borough: "Queens" },
        { id: "F03", name: "Parsons Blvd", borough: "Queens" },
        { id: "F04", name: "Sutphin Blvd", borough: "Queens" },
        { id: "G08", name: "Briarwood", borough: "Queens" },
        { id: "G09", name: "Kew Gardens - Union Tpke", borough: "Queens" },
        { id: "G10", name: "75 Av", borough: "Queens" },
        { id: "G11", name: "Forest Hills - 71 Av", borough: "Queens" },
        { id: "G12", name: "67 Av", borough: "Queens" },
        { id: "G13", name: "63 Dr - Rego Park", borough: "Queens" },
        { id: "G14", name: "Woodhaven Blvd", borough: "Queens" },
        { id: "G15", name: "Grand Av - Newtown", borough: "Queens" },
        { id: "G16", name: "Elmhurst Av", borough: "Queens" },
        { id: "G18", name: "Jackson Hts - Roosevelt Av", borough: "Queens" },
        { id: "G19", name: "21 St - Queensbridge", borough: "Queens" },
        { id: "D14", name: "Roosevelt Island", borough: "Manhattan" },
        { id: "D15", name: "Lexington Av/63 St", borough: "Manhattan" },
        { id: "D16", name: "57 St", borough: "Manhattan" },
        { id: "D17", name: "47-50 Sts - Rockefeller Ctr", borough: "Manhattan" },
        { id: "D18", name: "42 St - Bryant Park", borough: "Manhattan" },
        { id: "D19", name: "34 St - Herald Sq", borough: "Manhattan" },
        { id: "D20", name: "23 St", borough: "Manhattan" },
        { id: "D21", name: "14 St", borough: "Manhattan" },
        { id: "D22", name: "W 4 St - Wash Sq", borough: "Manhattan" },
        { id: "D23", name: "Broadway - Lafayette St", borough: "Manhattan" },
        { id: "F14", name: "2 Av", borough: "Manhattan" },
        { id: "F15", name: "Delancey St - Essex St", borough: "Manhattan" },
        { id: "F16", name: "East Broadway", borough: "Manhattan" },
        { id: "F18", name: "York St", borough: "Brooklyn" },
        { id: "F20", name: "Jay St - MetroTech", borough: "Brooklyn" },
        { id: "F21", name: "Bergen St", borough: "Brooklyn" },
        { id: "F22", name: "Carroll St", borough: "Brooklyn" },
        { id: "F23", name: "Smith - 9 Sts", borough: "Brooklyn" },
        { id: "F24", name: "4 Av - 9 St", borough: "Brooklyn" },
        { id: "F25", name: "7 Av", borough: "Brooklyn" },
        { id: "F26", name: "15 St - Prospect Park", borough: "Brooklyn" },
        { id: "F27", name: "Fort Hamilton Pkwy", borough: "Brooklyn" },
        { id: "F29", name: "Church Av", borough: "Brooklyn" },
        { id: "F30", name: "Ditmas Av", borough: "Brooklyn" },
        { id: "F31", name: "18 Av", borough: "Brooklyn" },
        { id: "F32", name: "Avenue I", borough: "Brooklyn" },
        { id: "F33", name: "Bay Pkwy", borough: "Brooklyn" },
        { id: "F34", name: "Avenue N", borough: "Brooklyn" },
        { id: "F35", name: "Avenue P", borough: "Brooklyn" },
        { id: "F36", name: "Kings Hwy", borough: "Brooklyn" },
        { id: "F38", name: "Avenue U", borough: "Brooklyn" },
        { id: "F39", name: "Avenue X", borough: "Brooklyn" },
        { id: "D41", name: "Neptune Av", borough: "Brooklyn" },
        { id: "D42", name: "Coney Island - Stillwell Av", borough: "Brooklyn" }
    ],
    "M": [
        { id: "M01", name: "Middle Village - Metropolitan Av", borough: "Queens" },
        { id: "M04", name: "Fresh Pond Rd", borough: "Queens" },
        { id: "M05", name: "Forest Av", borough: "Queens" },
        { id: "M06", name: "Seneca Av", borough: "Queens" },
        { id: "M08", name: "Myrtle - Wyckoff Avs", borough: "Queens" },
        { id: "M09", name: "Knickerbocker Av", borough: "Brooklyn" },
        { id: "M10", name: "Central Av", borough: "Brooklyn" },
        { id: "M11", name: "Myrtle Av", borough: "Brooklyn" },
        { id: "M12", name: "Flushing Av", borough: "Brooklyn" },
        { id: "M13", name: "Lorimer St", borough: "Brooklyn" },
        { id: "M14", name: "Hewes St", borough: "Brooklyn" },
        { id: "M16", name: "Marcy Av", borough: "Brooklyn" },
        { id: "M18", name: "Delancey St - Essex St", borough: "Manhattan" },
        { id: "D17", name: "Broadway - Lafayette St", borough: "Manhattan" },
        { id: "D18", name: "W 4 St - Wash Sq", borough: "Manhattan" },
        { id: "D19", name: "14 St", borough: "Manhattan" },
        { id: "D20", name: "23 St", borough: "Manhattan" },
        { id: "D21", name: "34 St - Herald Sq", borough: "Manhattan" },
        { id: "D22", name: "42 St - Bryant Park", borough: "Manhattan" },
        { id: "D23", name: "47-50 Sts - Rockefeller Ctr", borough: "Manhattan" }
    ],
    "G": [
        { id: "G22", name: "Court Sq", borough: "Queens" },
        { id: "G24", name: "21 St", borough: "Queens" },
        { id: "G26", name: "Greenpoint Av", borough: "Brooklyn" },
        { id: "G28", name: "Nassau Av", borough: "Brooklyn" },
        { id: "G29", name: "Metropolitan Av", borough: "Brooklyn" },
        { id: "G30", name: "Broadway", borough: "Brooklyn" },
        { id: "G31", name: "Flushing Av", borough: "Brooklyn" },
        { id: "G32", name: "Myrtle - Willoughby Avs", borough: "Brooklyn" },
        { id: "G33", name: "Bedford - Nostrand Avs", borough: "Brooklyn" },
        { id: "G34", name: "Classon Av", borough: "Brooklyn" },
        { id: "G35", name: "Clinton - Washington Avs", borough: "Brooklyn" },
        { id: "G36", name: "Fulton St", borough: "Brooklyn" },
        { id: "A42", name: "Hoyt - Schermerhorn Sts", borough: "Brooklyn" },
        { id: "F20", name: "Bergen St", borough: "Brooklyn" },
        { id: "F21", name: "Carroll St", borough: "Brooklyn" },
        { id: "F22", name: "Smith - 9 Sts", borough: "Brooklyn" },
        { id: "F23", name: "4 Av - 9 St", borough: "Brooklyn" },
        { id: "F24", name: "7 Av", borough: "Brooklyn" },
        { id: "F25", name: "15 St - Prospect Park", borough: "Brooklyn" },
        { id: "F26", name: "Fort Hamilton Pkwy", borough: "Brooklyn" },
        { id: "F27", name: "Church Av", borough: "Brooklyn" }
    ],
    "J": [
        { id: "G05", name: "Jamaica Center - Parsons/Archer", borough: "Queens" },
        { id: "G06", name: "Sutphin Blvd - Archer Av - JFK Airport", borough: "Queens" },
        { id: "J12", name: "121 St", borough: "Queens" },
        { id: "J13", name: "111 St", borough: "Queens" },
        { id: "J14", name: "104 St", borough: "Queens" },
        { id: "J15", name: "Woodhaven Blvd", borough: "Queens" },
        { id: "J16", name: "85 St - Forest Pkwy", borough: "Queens" },
        { id: "J17", name: "75 St - Elderts Ln", borough: "Queens" },
        { id: "J19", name: "Cypress Hills", borough: "Brooklyn" },
        { id: "J20", name: "Crescent St", borough: "Brooklyn" },
        { id: "J21", name: "Norwood Av", borough: "Brooklyn" },
        { id: "J22", name: "Cleveland St", borough: "Brooklyn" },
        { id: "J23", name: "Van Siclen Av", borough: "Brooklyn" },
        { id: "J24", name: "Alabama Av", borough: "Brooklyn" },
        { id: "J27", name: "Broadway Junction", borough: "Brooklyn" },
        { id: "J28", name: "Chauncey St", borough: "Brooklyn" },
        { id: "J29", name: "Halsey St", borough: "Brooklyn" },
        { id: "J30", name: "Gates Av", borough: "Brooklyn" },
        { id: "J31", name: "Kosciuszko St", borough: "Brooklyn" },
        { id: "M11", name: "Myrtle Av", borough: "Brooklyn" },
        { id: "M12", name: "Flushing Av", borough: "Brooklyn" },
        { id: "M13", name: "Lorimer St", borough: "Brooklyn" },
        { id: "M14", name: "Hewes St", borough: "Brooklyn" },
        { id: "M16", name: "Marcy Av", borough: "Brooklyn" },
        { id: "M18", name: "Delancey St - Essex St", borough: "Manhattan" },
        { id: "M19", name: "Bowery", borough: "Manhattan" },
        { id: "M20", name: "Canal St", borough: "Manhattan" },
        { id: "M21", name: "Chambers St", borough: "Manhattan" },
        { id: "M22", name: "Fulton St", borough: "Manhattan" },
        { id: "M23", name: "Broad St", borough: "Manhattan" }
    ],
    "Z": [
        { id: "G05", name: "Jamaica Center - Parsons/Archer", borough: "Queens" },
        { id: "G06", name: "Sutphin Blvd - Archer Av - JFK Airport", borough: "Queens" },
        { id: "J12", name: "121 St", borough: "Queens" },
        { id: "J14", name: "104 St", borough: "Queens" },
        { id: "J15", name: "Woodhaven Blvd", borough: "Queens" },
        { id: "J17", name: "75 St - Elderts Ln", borough: "Queens" },
        { id: "J19", name: "Cypress Hills", borough: "Brooklyn" },
        { id: "J21", name: "Norwood Av", borough: "Brooklyn" },
        { id: "J23", name: "Van Siclen Av", borough: "Brooklyn" },
        { id: "J27", name: "Broadway Junction", borough: "Brooklyn" },
        { id: "J28", name: "Chauncey St", borough: "Brooklyn" },
        { id: "J30", name: "Gates Av", borough: "Brooklyn" },
        { id: "M11", name: "Myrtle Av", borough: "Brooklyn" },
        { id: "M12", name: "Flushing Av", borough: "Brooklyn" },
        { id: "M14", name: "Hewes St", borough: "Brooklyn" },
        { id: "M16", name: "Marcy Av", borough: "Brooklyn" },
        { id: "M18", name: "Delancey St - Essex St", borough: "Manhattan" },
        { id: "M19", name: "Bowery", borough: "Manhattan" },
        { id: "M20", name: "Canal St", borough: "Manhattan" },
        { id: "M21", name: "Chambers St", borough: "Manhattan" },
        { id: "M22", name: "Fulton St", borough: "Manhattan" },
        { id: "M23", name: "Broad St", borough: "Manhattan" }
    ],
    "N": [
        { id: "R01", name: "Astoria - Ditmars Blvd", borough: "Queens" },
        { id: "R03", name: "Astoria Blvd", borough: "Queens" },
        { id: "R04", name: "30 Av", borough: "Queens" },
        { id: "R05", name: "Broadway", borough: "Queens" },
        { id: "R06", name: "36 Av", borough: "Queens" },
        { id: "R08", name: "39 Av", borough: "Queens" },
        { id: "R09", name: "Queensboro Plaza", borough: "Queens" },
        { id: "R11", name: "Lexington Av/59 St", borough: "Manhattan" },
        { id: "R13", name: "5 Av/59 St", borough: "Manhattan" },
        { id: "R14", name: "57 St - 7 Av", borough: "Manhattan" },
        { id: "R15", name: "49 St", borough: "Manhattan" },
        { id: "R16", name: "Times Sq - 42 St", borough: "Manhattan" },
        { id: "R17", name: "34 St - Herald Sq", borough: "Manhattan" },
        { id: "R18", name: "28 St", borough: "Manhattan" },
        { id: "R19", name: "23 St", borough: "Manhattan" },
        { id: "R20", name: "14 St - Union Sq", borough: "Manhattan" },
        { id: "R21", name: "8 St - NYU", borough: "Manhattan" },
        { id: "R22", name: "Prince St", borough: "Manhattan" },
        { id: "R23", name: "Canal St", borough: "Manhattan" },
        { id: "R24", name: "City Hall", borough: "Manhattan" },
        { id: "R25", name: "Cortlandt St", borough: "Manhattan" },
        { id: "R26", name: "Rector St", borough: "Manhattan" },
        { id: "R27", name: "Whitehall St - South Ferry", borough: "Manhattan" },
        { id: "R28", name: "Court St", borough: "Brooklyn" },
        { id: "R29", name: "Jay St - MetroTech", borough: "Brooklyn" },
        { id: "R30", name: "DeKalb Av", borough: "Brooklyn" },
        { id: "R31", name: "Atlantic Av - Barclays Ctr", borough: "Brooklyn" },
        { id: "R32", name: "Union St", borough: "Brooklyn" },
        { id: "R33", name: "4 Av - 9 St", borough: "Brooklyn" },
        { id: "R34", name: "Prospect Av", borough: "Brooklyn" },
        { id: "R35", name: "25 St", borough: "Brooklyn" },
        { id: "R36", name: "36 St", borough: "Brooklyn" },
        { id: "R39", name: "45 St", borough: "Brooklyn" },
        { id: "R40", name: "53 St", borough: "Brooklyn" },
        { id: "R41", name: "59 St", borough: "Brooklyn" },
        { id: "N02", name: "8 Av", borough: "Brooklyn" },
        { id: "N03", name: "Fort Hamilton Pkwy", borough: "Brooklyn" },
        { id: "N04", name: "New Utrecht Av", borough: "Brooklyn" },
        { id: "N05", name: "18 Av", borough: "Brooklyn" },
        { id: "N06", name: "20 Av", borough: "Brooklyn" },
        { id: "N07", name: "Bay Pkwy", borough: "Brooklyn" },
        { id: "N08", name: "Kings Hwy", borough: "Brooklyn" },
        { id: "N09", name: "Avenue U", borough: "Brooklyn" },
        { id: "N10", name: "86 St", borough: "Brooklyn" },
        { id: "D42", name: "Coney Island - Stillwell Av", borough: "Brooklyn" }
    ],
    "Q": [
        { id: "Q01", name: "96 St", borough: "Manhattan" },
        { id: "Q03", name: "86 St", borough: "Manhattan" },
        { id: "Q04", name: "72 St", borough: "Manhattan" },
        { id: "Q05", name: "Lexington Av/63 St", borough: "Manhattan" },
        { id: "R11", name: "Lexington Av/59 St", borough: "Manhattan" },
        { id: "R13", name: "5 Av/59 St", borough: "Manhattan" },
        { id: "R14", name: "57 St - 7 Av", borough: "Manhattan" },
        { id: "R15", name: "49 St", borough: "Manhattan" },
        { id: "R16", name: "Times Sq - 42 St", borough: "Manhattan" },
        { id: "R17", name: "34 St - Herald Sq", borough: "Manhattan" },
        { id: "R20", name: "14 St - Union Sq", borough: "Manhattan" },
        { id: "D21", name: "Canal St", borough: "Manhattan" },
        { id: "D20", name: "DeKalb Av", borough: "Brooklyn" },
        { id: "D21", name: "Atlantic Av - Barclays Ctr", borough: "Brooklyn" },
        { id: "D22", name: "7 Av", borough: "Brooklyn" },
        { id: "D24", name: "Prospect Park", borough: "Brooklyn" },
        { id: "D25", name: "Church Av", borough: "Brooklyn" },
        { id: "D26", name: "Beverly Rd", borough: "Brooklyn" },
        { id: "D27", name: "Cortelyou Rd", borough: "Brooklyn" },
        { id: "D28", name: "Newkirk Plaza", borough: "Brooklyn" },
        { id: "D29", name: "Avenue H", borough: "Brooklyn" },
        { id: "D30", name: "Avenue J", borough: "Brooklyn" },
        { id: "D31", name: "Avenue M", borough: "Brooklyn" },
        { id: "D32", name: "Kings Hwy", borough: "Brooklyn" },
        { id: "D33", name: "Avenue U", borough: "Brooklyn" },
        { id: "D34", name: "Neck Rd", borough: "Brooklyn" },
        { id: "D35", name: "Sheepshead Bay", borough: "Brooklyn" },
        { id: "D39", name: "Brighton Beach", borough: "Brooklyn" },
        { id: "D40", name: "Ocean Pkwy", borough: "Brooklyn" },
        { id: "D41", name: "W 8 St - NY Aquarium", borough: "Brooklyn" },
        { id: "D42", name: "Coney Island - Stillwell Av", borough: "Brooklyn" }
    ],
    "R": [
        { id: "G14", name: "Forest Hills - 71 Av", borough: "Queens" },
        { id: "G13", name: "67 Av", borough: "Queens" },
        { id: "G12", name: "63 Dr - Rego Park", borough: "Queens" },
        { id: "G11", name: "Woodhaven Blvd", borough: "Queens" },
        { id: "G10", name: "Grand Av - Newtown", borough: "Queens" },
        { id: "G09", name: "Elmhurst Av", borough: "Queens" },
        { id: "G08", name: "Jackson Hts - Roosevelt Av", borough: "Queens" },
        { id: "R09", name: "65 St", borough: "Queens" },
        { id: "R10", name: "Northern Blvd", borough: "Queens" },
        { id: "R11", name: "46 St", borough: "Queens" },
        { id: "R12", name: "Steinway St", borough: "Queens" },
        { id: "R13", name: "36 St", borough: "Queens" },
        { id: "R14", name: "Queens Plaza", borough: "Queens" },
        { id: "R15", name: "Lexington Av/59 St", borough: "Manhattan" },
        { id: "R16", name: "5 Av/59 St", borough: "Manhattan" },
        { id: "R17", name: "57 St - 7 Av", borough: "Manhattan" },
        { id: "R18", name: "49 St", borough: "Manhattan" },
        { id: "R19", name: "Times Sq - 42 St", borough: "Manhattan" },
        { id: "R20", name: "34 St - Herald Sq", borough: "Manhattan" },
        { id: "R21", name: "28 St", borough: "Manhattan" },
        { id: "R22", name: "23 St", borough: "Manhattan" },
        { id: "R23", name: "14 St - Union Sq", borough: "Manhattan" },
        { id: "R24", name: "8 St - NYU", borough: "Manhattan" },
        { id: "R25", name: "Prince St", borough: "Manhattan" },
        { id: "R26", name: "Canal St", borough: "Manhattan" },
        { id: "R27", name: "City Hall", borough: "Manhattan" },
        { id: "R28", name: "Cortlandt St", borough: "Manhattan" },
        { id: "R29", name: "Rector St", borough: "Manhattan" },
        { id: "R30", name: "Whitehall St - South Ferry", borough: "Manhattan" },
        { id: "R31", name: "Court St", borough: "Brooklyn" },
        { id: "R32", name: "Jay St - MetroTech", borough: "Brooklyn" },
        { id: "R33", name: "DeKalb Av", borough: "Brooklyn" },
        { id: "R34", name: "Atlantic Av - Barclays Ctr", borough: "Brooklyn" },
        { id: "R35", name: "Union St", borough: "Brooklyn" },
        { id: "R36", name: "4 Av - 9 St", borough: "Brooklyn" },
        { id: "R37", name: "Prospect Av", borough: "Brooklyn" },
        { id: "R38", name: "25 St", borough: "Brooklyn" },
        { id: "R39", name: "36 St", borough: "Brooklyn" },
        { id: "R40", name: "45 St", borough: "Brooklyn" },
        { id: "R41", name: "53 St", borough: "Brooklyn" },
        { id: "R42", name: "59 St", borough: "Brooklyn" },
        { id: "R43", name: "Bay Ridge Av", borough: "Brooklyn" },
        { id: "R44", name: "77 St", borough: "Brooklyn" },
        { id: "R45", name: "86 St", borough: "Brooklyn" },
        { id: "R46", name: "Bay Ridge - 95 St", borough: "Brooklyn" }
    ],
    "W": [
        { id: "R01", name: "Astoria - Ditmars Blvd", borough: "Queens" },
        { id: "R03", name: "Astoria Blvd", borough: "Queens" },
        { id: "R04", name: "30 Av", borough: "Queens" },
        { id: "R05", name: "Broadway", borough: "Queens" },
        { id: "R06", name: "36 Av", borough: "Queens" },
        { id: "R08", name: "39 Av", borough: "Queens" },
        { id: "R09", name: "Queensboro Plaza", borough: "Queens" },
        { id: "R11", name: "Lexington Av/59 St", borough: "Manhattan" },
        { id: "R13", name: "5 Av/59 St", borough: "Manhattan" },
        { id: "R14", name: "57 St - 7 Av", borough: "Manhattan" },
        { id: "R15", name: "49 St", borough: "Manhattan" },
        { id: "R16", name: "Times Sq - 42 St", borough: "Manhattan" },
        { id: "R17", name: "34 St - Herald Sq", borough: "Manhattan" },
        { id: "R18", name: "28 St", borough: "Manhattan" },
        { id: "R19", name: "23 St", borough: "Manhattan" },
        { id: "R20", name: "14 St - Union Sq", borough: "Manhattan" },
        { id: "R21", name: "8 St - NYU", borough: "Manhattan" },
        { id: "R22", name: "Prince St", borough: "Manhattan" },
        { id: "R23", name: "Canal St", borough: "Manhattan" },
        { id: "R24", name: "City Hall", borough: "Manhattan" },
        { id: "R25", name: "Cortlandt St", borough: "Manhattan" },
        { id: "R26", name: "Rector St", borough: "Manhattan" },
        { id: "R27", name: "Whitehall St - South Ferry", borough: "Manhattan" }
    ],
    "S": [
        { id: "901", name: "Grand Central - 42 St", borough: "Manhattan" },
        { id: "902", name: "Times Sq - 42 St", borough: "Manhattan" },
        { id: "A42", name: "Franklin Av", borough: "Brooklyn" },
        { id: "S01", name: "Park Pl", borough: "Brooklyn" },
        { id: "S03", name: "Botanic Garden", borough: "Brooklyn" },
        { id: "S04", name: "Prospect Park", borough: "Brooklyn" }
    ]
};

// Feed URLs for each line group
const FEED_URLS = {
    "1": "https://api-endpoint.mta.info/Dataservice/mtagtfsfeeds/nyct%2Fgtfs",
    "2": "https://api-endpoint.mta.info/Dataservice/mtagtfsfeeds/nyct%2Fgtfs",
    "3": "https://api-endpoint.mta.info/Dataservice/mtagtfsfeeds/nyct%2Fgtfs",
    "4": "https://api-endpoint.mta.info/Dataservice/mtagtfsfeeds/nyct%2Fgtfs",
    "5": "https://api-endpoint.mta.info/Dataservice/mtagtfsfeeds/nyct%2Fgtfs",
    "6": "https://api-endpoint.mta.info/Dataservice/mtagtfsfeeds/nyct%2Fgtfs",
    "7": "https://api-endpoint.mta.info/Dataservice/mtagtfsfeeds/nyct%2Fgtfs",
    "S": "https://api-endpoint.mta.info/Dataservice/mtagtfsfeeds/nyct%2Fgtfs",
    "A": "https://api-endpoint.mta.info/Dataservice/mtagtfsfeeds/nyct%2Fgtfs-ace",
    "C": "https://api-endpoint.mta.info/Dataservice/mtagtfsfeeds/nyct%2Fgtfs-ace",
    "E": "https://api-endpoint.mta.info/Dataservice/mtagtfsfeeds/nyct%2Fgtfs-ace",
    "B": "https://api-endpoint.mta.info/Dataservice/mtagtfsfeeds/nyct%2Fgtfs-bdfm",
    "D": "https://api-endpoint.mta.info/Dataservice/mtagtfsfeeds/nyct%2Fgtfs-bdfm",
    "F": "https://api-endpoint.mta.info/Dataservice/mtagtfsfeeds/nyct%2Fgtfs-bdfm",
    "M": "https://api-endpoint.mta.info/Dataservice/mtagtfsfeeds/nyct%2Fgtfs-bdfm",
    "G": "https://api-endpoint.mta.info/Dataservice/mtagtfsfeeds/nyct%2Fgtfs-g",
    "J": "https://api-endpoint.mta.info/Dataservice/mtagtfsfeeds/nyct%2Fgtfs-jz",
    "Z": "https://api-endpoint.mta.info/Dataservice/mtagtfsfeeds/nyct%2Fgtfs-jz",
    "L": "https://api-endpoint.mta.info/Dataservice/mtagtfsfeeds/nyct%2Fgtfs-l",
    "N": "https://api-endpoint.mta.info/Dataservice/mtagtfsfeeds/nyct%2Fgtfs-nqrw",
    "Q": "https://api-endpoint.mta.info/Dataservice/mtagtfsfeeds/nyct%2Fgtfs-nqrw",
    "R": "https://api-endpoint.mta.info/Dataservice/mtagtfsfeeds/nyct%2Fgtfs-nqrw",
    "W": "https://api-endpoint.mta.info/Dataservice/mtagtfsfeeds/nyct%2Fgtfs-nqrw"
};

// Direction names for each line (based on terminal stations)
const DIRECTION_NAMES = {
    "L": { "N": "8 Av (Manhattan)", "S": "Canarsie - Rockaway Pkwy" },
    "1": { "N": "Van Cortlandt Park", "S": "South Ferry" },
    "2": { "N": "Wakefield - 241 St", "S": "Flatbush Av" },
    "3": { "N": "Harlem - 148 St", "S": "New Lots Av" },
    "4": { "N": "Woodlawn", "S": "Crown Hts - Utica Av" },
    "5": { "N": "Eastchester - Dyre Av", "S": "Flatbush Av" },
    "6": { "N": "Pelham Bay Park", "S": "Brooklyn Bridge" },
    "7": { "N": "Flushing - Main St", "S": "34 St - Hudson Yards" },
    "A": { "N": "Inwood - 207 St", "S": "Far Rockaway / Lefferts Blvd" },
    "C": { "N": "168 St", "S": "Euclid Av" },
    "E": { "N": "Jamaica Center", "S": "World Trade Center" },
    "B": { "N": "145 St", "S": "Brighton Beach" },
    "D": { "N": "Norwood - 205 St", "S": "Coney Island" },
    "F": { "N": "Jamaica - 179 St", "S": "Coney Island" },
    "M": { "N": "Middle Village", "S": "Rockefeller Ctr" },
    "G": { "N": "Court Sq", "S": "Church Av" },
    "J": { "N": "Jamaica Center", "S": "Broad St" },
    "Z": { "N": "Jamaica Center", "S": "Broad St" },
    "N": { "N": "Astoria - Ditmars", "S": "Coney Island" },
    "Q": { "N": "96 St", "S": "Coney Island" },
    "R": { "N": "Forest Hills", "S": "Bay Ridge - 95 St" },
    "W": { "N": "Astoria - Ditmars", "S": "Whitehall St" },
    "S": { "N": "Times Sq", "S": "Grand Central" }
};

// State
let currentLine = "L";
let currentStation = "L10"; // Metropolitan Av / Lorimer St
let refreshInterval = null;
let lastFetchTime = null;
let isLoading = false;

// DOM Elements
const lineButtons = document.getElementById('lineButtons');
const stationSelect = document.getElementById('stationSelect');
const arrivalsContainer = document.getElementById('arrivalsContainer');
const lastUpdatedEl = document.getElementById('lastUpdated');
const refreshBtn = document.getElementById('refreshBtn');
const statusDot = document.getElementById('statusDot');
const statusText = document.getElementById('statusText');
const nextRefreshEl = document.getElementById('nextRefresh');

// Initialize the app
function init() {
    // Set up line buttons
    lineButtons.addEventListener('click', (e) => {
        if (e.target.classList.contains('line-btn')) {
            selectLine(e.target.dataset.line);
        }
    });

    // Set up station selector
    stationSelect.addEventListener('change', (e) => {
        currentStation = e.target.value;
        saveState();
        fetchArrivals();
    });

    // Set up refresh button
    refreshBtn.addEventListener('click', () => {
        fetchArrivals();
    });

    // Load saved state or use defaults
    loadState();

    // Populate stations for initial line
    populateStations(currentLine);

    // Select default station
    stationSelect.value = currentStation;

    // Fetch initial data
    fetchArrivals();

    // Set up auto-refresh every 60 seconds
    startAutoRefresh();
}

function selectLine(line) {
    // Update button states
    document.querySelectorAll('.line-btn').forEach(btn => {
        btn.classList.toggle('selected', btn.dataset.line === line);
    });

    currentLine = line;
    populateStations(line);

    // Select first station by default
    if (STATIONS[line] && STATIONS[line].length > 0) {
        currentStation = STATIONS[line][0].id;
        stationSelect.value = currentStation;
    }

    saveState();
    fetchArrivals();
}

function populateStations(line) {
    const stations = STATIONS[line] || [];
    stationSelect.innerHTML = stations.map(station =>
        `<option value="${station.id}">${station.name} (${station.borough})</option>`
    ).join('');
}

async function fetchArrivals() {
    if (isLoading) return;

    isLoading = true;
    refreshBtn.classList.add('spinning');
    updateStatus('loading');

    try {
        // Use a CORS proxy for browser requests
        const feedUrl = FEED_URLS[currentLine];
        const proxyUrl = `https://api.allorigins.win/raw?url=${encodeURIComponent(feedUrl)}`;

        const response = await fetch(proxyUrl);

        if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
        }

        const buffer = await response.arrayBuffer();
        const arrivals = parseGTFSRT(buffer);

        displayArrivals(arrivals);
        lastFetchTime = new Date();
        updateStatus('connected');
        updateLastUpdated();

    } catch (error) {
        console.error('Error fetching arrivals:', error);

        // Show demo data with real-looking times
        displayDemoArrivals();
        updateStatus('demo');
    }

    isLoading = false;
    refreshBtn.classList.remove('spinning');
}

// Parse GTFS-RT Protocol Buffer data
function parseGTFSRT(buffer) {
    const arrivals = { north: [], south: [] };

    try {
        // Simple protobuf parsing for GTFS-RT
        const data = new Uint8Array(buffer);
        const decoded = decodeProtobuf(data);

        if (decoded && decoded.entity) {
            const now = Date.now() / 1000;

            decoded.entity.forEach(entity => {
                if (entity.tripUpdate && entity.tripUpdate.stopTimeUpdate) {
                    const routeId = entity.tripUpdate.trip?.routeId || currentLine;

                    entity.tripUpdate.stopTimeUpdate.forEach(update => {
                        const stopId = update.stopId || '';
                        const baseStopId = stopId.replace(/[NS]$/, '');

                        if (baseStopId === currentStation) {
                            const direction = stopId.endsWith('N') ? 'north' : 'south';
                            const arrivalTime = update.arrival?.time || update.departure?.time;

                            if (arrivalTime && arrivalTime > now) {
                                const minutesAway = Math.round((arrivalTime - now) / 60);
                                arrivals[direction].push({
                                    minutes: minutesAway,
                                    route: routeId,
                                    destination: DIRECTION_NAMES[currentLine]?.[direction === 'north' ? 'N' : 'S'] || direction
                                });
                            }
                        }
                    });
                }
            });
        }

        // Sort by arrival time
        arrivals.north.sort((a, b) => a.minutes - b.minutes);
        arrivals.south.sort((a, b) => a.minutes - b.minutes);

        // Limit to 5 trains per direction
        arrivals.north = arrivals.north.slice(0, 5);
        arrivals.south = arrivals.south.slice(0, 5);

    } catch (error) {
        console.error('Error parsing GTFS-RT:', error);
    }

    return arrivals;
}

// Simple protobuf decoder for GTFS-RT
function decodeProtobuf(data) {
    const result = { entity: [] };
    let pos = 0;

    function readVarint() {
        let value = 0;
        let shift = 0;
        while (pos < data.length) {
            const byte = data[pos++];
            value |= (byte & 0x7f) << shift;
            if ((byte & 0x80) === 0) break;
            shift += 7;
        }
        return value;
    }

    function readLengthDelimited() {
        const length = readVarint();
        const bytes = data.slice(pos, pos + length);
        pos += length;
        return bytes;
    }

    function readString(bytes) {
        return new TextDecoder().decode(bytes);
    }

    function parseEntity(bytes) {
        const entity = {};
        let epos = 0;

        while (epos < bytes.length) {
            const tag = bytes[epos++];
            const fieldNum = tag >> 3;
            const wireType = tag & 0x7;

            if (wireType === 2) { // Length-delimited
                let len = 0;
                let shift = 0;
                while (epos < bytes.length) {
                    const byte = bytes[epos++];
                    len |= (byte & 0x7f) << shift;
                    if ((byte & 0x80) === 0) break;
                    shift += 7;
                }
                const fieldBytes = bytes.slice(epos, epos + len);
                epos += len;

                if (fieldNum === 3) { // TripUpdate
                    entity.tripUpdate = parseTripUpdate(fieldBytes);
                }
            } else if (wireType === 0) { // Varint
                let val = 0;
                let shift = 0;
                while (epos < bytes.length) {
                    const byte = bytes[epos++];
                    val |= (byte & 0x7f) << shift;
                    if ((byte & 0x80) === 0) break;
                    shift += 7;
                }
            }
        }

        return entity;
    }

    function parseTripUpdate(bytes) {
        const tripUpdate = { stopTimeUpdate: [] };
        let tpos = 0;

        while (tpos < bytes.length) {
            const tag = bytes[tpos++];
            const fieldNum = tag >> 3;
            const wireType = tag & 0x7;

            if (wireType === 2) {
                let len = 0;
                let shift = 0;
                while (tpos < bytes.length) {
                    const byte = bytes[tpos++];
                    len |= (byte & 0x7f) << shift;
                    if ((byte & 0x80) === 0) break;
                    shift += 7;
                }
                const fieldBytes = bytes.slice(tpos, tpos + len);
                tpos += len;

                if (fieldNum === 1) { // Trip descriptor
                    tripUpdate.trip = parseTripDescriptor(fieldBytes);
                } else if (fieldNum === 2) { // StopTimeUpdate
                    tripUpdate.stopTimeUpdate.push(parseStopTimeUpdate(fieldBytes));
                }
            } else if (wireType === 0) {
                let shift = 0;
                while (tpos < bytes.length) {
                    const byte = bytes[tpos++];
                    if ((byte & 0x80) === 0) break;
                    shift += 7;
                }
            }
        }

        return tripUpdate;
    }

    function parseTripDescriptor(bytes) {
        const trip = {};
        let dpos = 0;

        while (dpos < bytes.length) {
            const tag = bytes[dpos++];
            const fieldNum = tag >> 3;
            const wireType = tag & 0x7;

            if (wireType === 2) {
                let len = 0;
                let shift = 0;
                while (dpos < bytes.length) {
                    const byte = bytes[dpos++];
                    len |= (byte & 0x7f) << shift;
                    if ((byte & 0x80) === 0) break;
                    shift += 7;
                }
                const fieldBytes = bytes.slice(dpos, dpos + len);
                dpos += len;

                if (fieldNum === 5) { // route_id
                    trip.routeId = readString(fieldBytes);
                }
            } else if (wireType === 0) {
                let shift = 0;
                while (dpos < bytes.length) {
                    const byte = bytes[dpos++];
                    if ((byte & 0x80) === 0) break;
                    shift += 7;
                }
            }
        }

        return trip;
    }

    function parseStopTimeUpdate(bytes) {
        const update = {};
        let spos = 0;

        while (spos < bytes.length) {
            const tag = bytes[spos++];
            const fieldNum = tag >> 3;
            const wireType = tag & 0x7;

            if (wireType === 2) {
                let len = 0;
                let shift = 0;
                while (spos < bytes.length) {
                    const byte = bytes[spos++];
                    len |= (byte & 0x7f) << shift;
                    if ((byte & 0x80) === 0) break;
                    shift += 7;
                }
                const fieldBytes = bytes.slice(spos, spos + len);
                spos += len;

                if (fieldNum === 2) { // arrival
                    update.arrival = parseStopTimeEvent(fieldBytes);
                } else if (fieldNum === 3) { // departure
                    update.departure = parseStopTimeEvent(fieldBytes);
                } else if (fieldNum === 4) { // stop_id
                    update.stopId = readString(fieldBytes);
                }
            } else if (wireType === 0) {
                let val = 0;
                let shift = 0;
                while (spos < bytes.length) {
                    const byte = bytes[spos++];
                    val |= (byte & 0x7f) << shift;
                    if ((byte & 0x80) === 0) break;
                    shift += 7;
                }

                if (fieldNum === 1) { // stop_sequence
                    update.stopSequence = val;
                }
            }
        }

        return update;
    }

    function parseStopTimeEvent(bytes) {
        const event = {};
        let epos = 0;

        while (epos < bytes.length) {
            const tag = bytes[epos++];
            const fieldNum = tag >> 3;
            const wireType = tag & 0x7;

            if (wireType === 0) {
                let val = 0;
                let shift = 0;
                while (epos < bytes.length) {
                    const byte = bytes[epos++];
                    val |= (byte & 0x7f) << shift;
                    if ((byte & 0x80) === 0) break;
                    shift += 7;
                }

                if (fieldNum === 2) { // time
                    event.time = val;
                }
            }
        }

        return event;
    }

    // Parse feed message
    while (pos < data.length) {
        const tag = data[pos++];
        const fieldNum = tag >> 3;
        const wireType = tag & 0x7;

        if (wireType === 2) {
            const bytes = readLengthDelimited();
            if (fieldNum === 2) { // entity
                const entity = parseEntity(bytes);
                if (entity.tripUpdate) {
                    result.entity.push(entity);
                }
            }
        } else if (wireType === 0) {
            readVarint();
        }
    }

    return result;
}

function displayDemoArrivals() {
    // Generate realistic demo arrival times
    const now = new Date();
    const directions = DIRECTION_NAMES[currentLine] || { N: "Uptown", S: "Downtown" };

    const arrivals = {
        north: [
            { minutes: 2, route: currentLine, destination: directions.N },
            { minutes: 7, route: currentLine, destination: directions.N },
            { minutes: 14, route: currentLine, destination: directions.N },
            { minutes: 22, route: currentLine, destination: directions.N }
        ],
        south: [
            { minutes: 4, route: currentLine, destination: directions.S },
            { minutes: 11, route: currentLine, destination: directions.S },
            { minutes: 18, route: currentLine, destination: directions.S },
            { minutes: 26, route: currentLine, destination: directions.S }
        ]
    };

    displayArrivals(arrivals);
    lastFetchTime = now;
    updateLastUpdated();
}

function displayArrivals(arrivals) {
    const station = STATIONS[currentLine]?.find(s => s.id === currentStation);
    const stationName = station?.name || 'Unknown Station';
    const directions = DIRECTION_NAMES[currentLine] || { N: "Uptown", S: "Downtown" };

    let html = `
        <div class="station-name">
            <span class="line-indicator" style="background: ${getLineColor(currentLine)}; color: ${getLineTextColor(currentLine)}">
                ${currentLine}
            </span>
            ${stationName}
        </div>
    `;

    // Northbound/Manhattan-bound
    html += `
        <div class="direction-section">
            <div class="direction-header">
                <span class="direction-indicator uptown"></span>
                <span class="direction-title">To ${directions.N}</span>
            </div>
            <div class="arrivals-list">
    `;

    if (arrivals.north.length === 0) {
        html += `<div class="no-trains">No trains scheduled</div>`;
    } else {
        arrivals.north.forEach(train => {
            const timeDisplay = train.minutes <= 1 ? 'Arriving' : `${train.minutes} min`;
            const isArriving = train.minutes <= 1;
            html += `
                <div class="arrival-item">
                    <span class="arrival-destination">${train.destination}</span>
                    <span class="arrival-time ${isArriving ? 'arriving' : ''}">${timeDisplay}</span>
                </div>
            `;
        });
    }

    html += `</div></div>`;

    // Southbound/Brooklyn-bound
    html += `
        <div class="direction-section">
            <div class="direction-header">
                <span class="direction-indicator downtown"></span>
                <span class="direction-title">To ${directions.S}</span>
            </div>
            <div class="arrivals-list">
    `;

    if (arrivals.south.length === 0) {
        html += `<div class="no-trains">No trains scheduled</div>`;
    } else {
        arrivals.south.forEach(train => {
            const timeDisplay = train.minutes <= 1 ? 'Arriving' : `${train.minutes} min`;
            const isArriving = train.minutes <= 1;
            html += `
                <div class="arrival-item">
                    <span class="arrival-destination">${train.destination}</span>
                    <span class="arrival-time ${isArriving ? 'arriving' : ''}">${timeDisplay}</span>
                </div>
            `;
        });
    }

    html += `</div></div>`;

    arrivalsContainer.innerHTML = html;
}

function getLineColor(line) {
    const colors = {
        "1": "#ee352e", "2": "#ee352e", "3": "#ee352e",
        "4": "#00933c", "5": "#00933c", "6": "#00933c",
        "7": "#b933ad",
        "A": "#0039a6", "C": "#0039a6", "E": "#0039a6",
        "B": "#ff6319", "D": "#ff6319", "F": "#ff6319", "M": "#ff6319",
        "G": "#6cbe45",
        "J": "#996633", "Z": "#996633",
        "L": "#a7a9ac",
        "N": "#fccc0a", "Q": "#fccc0a", "R": "#fccc0a", "W": "#fccc0a",
        "S": "#808183"
    };
    return colors[line] || "#808183";
}

function getLineTextColor(line) {
    const darkText = ["L", "N", "Q", "R", "W"];
    return darkText.includes(line) ? "#000" : "#fff";
}

function updateStatus(status) {
    statusDot.className = 'status-dot';

    switch (status) {
        case 'connected':
            statusText.textContent = 'Live data';
            break;
        case 'loading':
            statusText.textContent = 'Updating...';
            break;
        case 'demo':
            statusDot.classList.add('error');
            statusText.textContent = 'Demo mode (API unavailable)';
            break;
        case 'error':
            statusDot.classList.add('error');
            statusText.textContent = 'Connection error';
            break;
    }
}

function updateLastUpdated() {
    if (lastFetchTime) {
        const timeStr = lastFetchTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        lastUpdatedEl.textContent = `Last updated: ${timeStr}`;
    }
}

function startAutoRefresh() {
    // Clear any existing interval
    if (refreshInterval) {
        clearInterval(refreshInterval);
    }

    let secondsUntilRefresh = 60;

    // Update countdown every second
    const countdownInterval = setInterval(() => {
        secondsUntilRefresh--;
        nextRefreshEl.textContent = `Refresh in ${secondsUntilRefresh}s`;

        if (secondsUntilRefresh <= 0) {
            secondsUntilRefresh = 60;
        }
    }, 1000);

    // Refresh data every 60 seconds
    refreshInterval = setInterval(() => {
        fetchArrivals();
        secondsUntilRefresh = 60;
    }, 60000);
}

function saveState() {
    localStorage.setItem('nycSubway_line', currentLine);
    localStorage.setItem('nycSubway_station', currentStation);
}

function loadState() {
    const savedLine = localStorage.getItem('nycSubway_line');
    const savedStation = localStorage.getItem('nycSubway_station');

    if (savedLine && STATIONS[savedLine]) {
        currentLine = savedLine;
        document.querySelectorAll('.line-btn').forEach(btn => {
            btn.classList.toggle('selected', btn.dataset.line === currentLine);
        });
    }

    if (savedStation) {
        currentStation = savedStation;
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', init);
