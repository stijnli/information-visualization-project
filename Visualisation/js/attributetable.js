// data is a subset of the orignal data used during the builiding process
const testdata = [{"album": {"album_type": "single","artists": [{"external_urls": {"spotify": "https://open.spotify.com/artist/3eVa5w3URK5duf6eyVDbu9"},"href": "https://api.spotify.com/v1/artists/3eVa5w3URK5duf6eyVDbu9", "id": "3eVa5w3URK5duf6eyVDbu9","name": "ROS\u00c9","type": "artist","uri": "spotify:artist:3eVa5w3URK5duf6eyVDbu9"}, {"external_urls": {"spotify": "https://open.spotify.com/artist/0du5cEVh5yTK9QJze8zA0C"}, "href": "https://api.spotify.com/v1/artists/0du5cEVh5yTK9QJze8zA0C", "id": "0du5cEVh5yTK9QJze8zA0C", "name": "Bruno Mars", "type": "artist", "uri": "spotify:artist:0du5cEVh5yTK9QJze8zA0C"}], "available_markets": ["AR", "AU", "AT", "BE", "BO", "BR", "BG", "CA", "CL", "CO", "CR", "CY", "CZ", "DK", "DO", "DE", "EC", "EE", "SV", "FI", "FR", "GR", "GT", "HN", "HK", "HU", "IS", "IE", "IT", "LV", "LT", "LU", "MY", "MT", "MX", "NL", "NZ", "NI", "NO", "PA", "PY", "PE", "PH", "PL", "PT", "SG", "SK", "ES", "SE", "CH", "TW", "TR", "UY", "US", "GB", "AD", "LI", "MC", "ID", "JP", "TH", "VN", "RO", "IL", "ZA", "SA", "AE", "BH", "QA", "OM", "KW", "EG", "MA", "DZ", "TN", "LB", "JO", "PS", "IN", "KZ", "MD", "UA", "AL", "BA", "HR", "ME", "MK", "RS", "SI", "BD", "PK", "LK", "GH", "KE", "NG", "TZ", "UG", "AG", "AM", "BS", "BB", "BZ", "BT", "BW", "BF", "CV", "CW", "DM", "FJ", "GM", "GE", "GD", "GW", "GY", "HT", "JM", "KI", "LS", "LR", "MW", "MV", "ML", "MH", "FM", "NA", "NR", "NE", "PW", "PG", "PR", "WS", "SM", "ST", "SN", "SC", "SL", "SB", "KN", "LC", "VC", "SR", "TL", "TO", "TT", "TV", "VU", "AZ", "BN", "BI", "KH", "CM", "TD", "KM", "GQ", "SZ", "GA", "GN", "KG", "LA", "MO", "MR", "MN", "NP", "RW", "TG", "UZ", "ZW", "BJ", "MG", "MU", "MZ", "AO", "CI", "DJ", "ZM", "CD", "CG", "IQ", "LY", "TJ", "VE", "ET", "XK"], "external_urls": {"spotify": "https://open.spotify.com/album/2IYQwwgxgOIn7t3iF6ufFD"}, "href": "https://api.spotify.com/v1/albums/2IYQwwgxgOIn7t3iF6ufFD", "id": "2IYQwwgxgOIn7t3iF6ufFD", "images": [{"url": "https://i.scdn.co/image/ab67616d0000b27336032cb4acd9df050bc2e197", "width": 640, "height": 640}, {"url": "https://i.scdn.co/image/ab67616d00001e0236032cb4acd9df050bc2e197", "width": 300, "height": 300}, {"url": "https://i.scdn.co/image/ab67616d0000485136032cb4acd9df050bc2e197", "width": 64, "height": 64}], "name": "APT.", "release_date": "2024-10-18", "release_date_precision": "day", "total_tracks": 1, "type": "album", "uri": "spotify:album:2IYQwwgxgOIn7t3iF6ufFD"}, "artists": [{"external_urls": {"spotify": "https://open.spotify.com/artist/3eVa5w3URK5duf6eyVDbu9"}, "href": "https://api.spotify.com/v1/artists/3eVa5w3URK5duf6eyVDbu9", "id": "3eVa5w3URK5duf6eyVDbu9", "name": "ROS\u00c9", "type": "artist", "uri": "spotify:artist:3eVa5w3URK5duf6eyVDbu9"}, {"external_urls": {"spotify": "https://open.spotify.com/artist/0du5cEVh5yTK9QJze8zA0C"}, "href": "https://api.spotify.com/v1/artists/0du5cEVh5yTK9QJze8zA0C", "id": "0du5cEVh5yTK9QJze8zA0C", "name": "Bruno Mars", "type": "artist", "uri": "spotify:artist:0du5cEVh5yTK9QJze8zA0C"}], "available_markets": ["AR", "AU", "AT", "BE", "BO", "BR", "BG", "CA", "CL", "CO", "CR", "CY", "CZ", "DK", "DO", "DE", "EC", "EE", "SV", "FI", "FR", "GR", "GT", "HN", "HK", "HU", "IS", "IE", "IT", "LV", "LT", "LU", "MY", "MT", "MX", "NL", "NZ", "NI", "NO", "PA", "PY", "PE", "PH", "PL", "PT", "SG", "SK", "ES", "SE", "CH", "TW", "TR", "UY", "US", "GB", "AD", "LI", "MC", "ID", "JP", "TH", "VN", "RO", "IL", "ZA", "SA", "AE", "BH", "QA", "OM", "KW", "EG", "MA", "DZ", "TN", "LB", "JO", "PS", "IN", "KZ", "MD", "UA", "AL", "BA", "HR", "ME", "MK", "RS", "SI", "BD", "PK", "LK", "GH", "KE", "NG", "TZ", "UG", "AG", "AM", "BS", "BB", "BZ", "BT", "BW", "BF", "CV", "CW", "DM", "FJ", "GM", "GE", "GD", "GW", "GY", "HT", "JM", "KI", "LS", "LR", "MW", "MV", "ML", "MH", "FM", "NA", "NR", "NE", "PW", "PG", "PR", "WS", "SM", "ST", "SN", "SC", "SL", "SB", "KN", "LC", "VC", "SR", "TL", "TO", "TT", "TV", "VU", "AZ", "BN", "BI", "KH", "CM", "TD", "KM", "GQ", "SZ", "GA", "GN", "KG", "LA", "MO", "MR", "MN", "NP", "RW", "TG", "UZ", "ZW", "BJ", "MG", "MU", "MZ", "AO", "CI", "DJ", "ZM", "CD", "CG", "IQ", "LY", "TJ", "VE", "ET", "XK"], "disc_number": 1, "duration_ms": 169917, "explicit": false, "external_ids": {"isrc": "USAT22409172"}, "external_urls": {"spotify": "https://open.spotify.com/track/5vNRhkKd0yEAg8suGBpjeY"}, "href": "https://api.spotify.com/v1/tracks/5vNRhkKd0yEAg8suGBpjeY", "id": "5vNRhkKd0yEAg8suGBpjeY", "is_local": false, "name": "APT.", "popularity": 99, "preview_url": null, "track_number": 1, "type": "track", "uri": "spotify:track:5vNRhkKd0yEAg8suGBpjeY", "danceability": 0.777, "energy": 0.783, "key": 0, "loudness": -4.477, "mode": 0, "speechiness": 0.26, "acousticness": 0.0283, "instrumentalness": 0.0, "liveness": 0.355, "valence": 0.939, "tempo": 149.027, "time_signature": 4}, 
{"album": {"album_type": "single", "artists": [{"external_urls": {"spotify": "https://open.spotify.com/artist/1HY2Jd0NmPuamShAr6KMms"}, "href": "https://api.spotify.com/v1/artists/1HY2Jd0NmPuamShAr6KMms", "id": "1HY2Jd0NmPuamShAr6KMms", "name": "Lady Gaga", "type": "artist", "uri": "spotify:artist:1HY2Jd0NmPuamShAr6KMms"}, {"external_urls": {"spotify": "https://open.spotify.com/artist/0du5cEVh5yTK9QJze8zA0C"}, "href": "https://api.spotify.com/v1/artists/0du5cEVh5yTK9QJze8zA0C", "id": "0du5cEVh5yTK9QJze8zA0C", "name": "Bruno Mars", "type": "artist", "uri": "spotify:artist:0du5cEVh5yTK9QJze8zA0C"}], "available_markets": ["AR", "AU", "AT", "BE", "BO", "BR", "BG", "CA", "CL", "CO", "CR", "CY", "CZ", "DK", "DO", "DE", "EC", "EE", "SV", "FI", "FR", "GR", "GT", "HN", "HK", "HU", "IS", "IE", "IT", "LV", "LT", "LU", "MY", "MT", "MX", "NL", "NZ", "NI", "NO", "PA", "PY", "PE", "PH", "PL", "PT", "SG", "SK", "ES", "SE", "CH", "TW", "TR", "UY", "US", "GB", "AD", "LI", "MC", "ID", "JP", "TH", "VN", "RO", "IL", "ZA", "SA", "AE", "BH", "QA", "OM", "KW", "EG", "MA", "DZ", "TN", "LB", "JO", "PS", "IN", "KZ", "MD", "UA", "AL", "BA", "HR", "ME", "MK", "RS", "SI", "KR", "BD", "PK", "LK", "GH", "KE", "NG", "TZ", "UG", "AG", "AM", "BS", "BB", "BZ", "BT", "BW", "BF", "CV", "CW", "DM", "FJ", "GM", "GE", "GD", "GW", "GY", "HT", "JM", "KI", "LS", "LR", "MW", "MV", "ML", "MH", "FM", "NA", "NR", "NE", "PW", "PG", "WS", "SM", "ST", "SN", "SC", "SL", "SB", "KN", "LC", "VC", "SR", "TL", "TO", "TT", "TV", "VU", "AZ", "BN", "BI", "KH", "CM", "TD", "KM", "GQ", "SZ", "GA", "GN", "KG", "LA", "MO", "MR", "MN", "NP", "RW", "TG", "UZ", "ZW", "BJ", "MG", "MU", "MZ", "AO", "CI", "DJ", "ZM", "CD", "CG", "IQ", "LY", "TJ", "VE", "ET", "XK"], "external_urls": {"spotify": "https://open.spotify.com/album/10FLjwfpbxLmW8c25Xyc2N"}, "href": "https://api.spotify.com/v1/albums/10FLjwfpbxLmW8c25Xyc2N", "id": "10FLjwfpbxLmW8c25Xyc2N", "images": [{"url": "https://i.scdn.co/image/ab67616d0000b27382ea2e9e1858aa012c57cd45", "width": 640, "height": 640}, {"url": "https://i.scdn.co/image/ab67616d00001e0282ea2e9e1858aa012c57cd45", "width": 300, "height": 300}, {"url": "https://i.scdn.co/image/ab67616d0000485182ea2e9e1858aa012c57cd45", "width": 64, "height": 64}], "name": "Die With A Smile", "release_date": "2024-08-16", "release_date_precision": "day", "total_tracks": 1, "type": "album", "uri": "spotify:album:10FLjwfpbxLmW8c25Xyc2N"}, "artists": [{"external_urls": {"spotify": "https://open.spotify.com/artist/1HY2Jd0NmPuamShAr6KMms"}, "href": "https://api.spotify.com/v1/artists/1HY2Jd0NmPuamShAr6KMms", "id": "1HY2Jd0NmPuamShAr6KMms", "name": "Lady Gaga", "type": "artist", "uri": "spotify:artist:1HY2Jd0NmPuamShAr6KMms"}, {"external_urls": {"spotify": "https://open.spotify.com/artist/0du5cEVh5yTK9QJze8zA0C"}, "href": "https://api.spotify.com/v1/artists/0du5cEVh5yTK9QJze8zA0C", "id": "0du5cEVh5yTK9QJze8zA0C", "name": "Bruno Mars", "type": "artist", "uri": "spotify:artist:0du5cEVh5yTK9QJze8zA0C"}], "available_markets": ["AR", "AU", "AT", "BE", "BO", "BR", "BG", "CA", "CL", "CO", "CR", "CY", "CZ", "DK", "DO", "DE", "EC", "EE", "SV", "FI", "FR", "GR", "GT", "HN", "HK", "HU", "IS", "IE", "IT", "LV", "LT", "LU", "MY", "MT", "MX", "NL", "NZ", "NI", "NO", "PA", "PY", "PE", "PH", "PL", "PT", "SG", "SK", "ES", "SE", "CH", "TW", "TR", "UY", "US", "GB", "AD", "LI", "MC", "ID", "JP", "TH", "VN", "RO", "IL", "ZA", "SA", "AE", "BH", "QA", "OM", "KW", "EG", "MA", "DZ", "TN", "LB", "JO", "PS", "IN", "KZ", "MD", "UA", "AL", "BA", "HR", "ME", "MK", "RS", "SI", "KR", "BD", "PK", "LK", "GH", "KE", "NG", "TZ", "UG", "AG", "AM", "BS", "BB", "BZ", "BT", "BW", "BF", "CV", "CW", "DM", "FJ", "GM", "GE", "GD", "GW", "GY", "HT", "JM", "KI", "LS", "LR", "MW", "MV", "ML", "MH", "FM", "NA", "NR", "NE", "PW", "PG", "WS", "SM", "ST", "SN", "SC", "SL", "SB", "KN", "LC", "VC", "SR", "TL", "TO", "TT", "TV", "VU", "AZ", "BN", "BI", "KH", "CM", "TD", "KM", "GQ", "SZ", "GA", "GN", "KG", "LA", "MO", "MR", "MN", "NP", "RW", "TG", "UZ", "ZW", "BJ", "MG", "MU", "MZ", "AO", "CI", "DJ", "ZM", "CD", "CG", "IQ", "LY", "TJ", "VE", "ET", "XK"], "disc_number": 1, "duration_ms": 251667, "explicit": false, "external_ids": {"isrc": "USUM72409273"}, "external_urls": {"spotify": "https://open.spotify.com/track/2plbrEY59IikOBgBGLjaoe"}, "href": "https://api.spotify.com/v1/tracks/2plbrEY59IikOBgBGLjaoe", "id": "2plbrEY59IikOBgBGLjaoe", "is_local": false, "name": "Die With A Smile", "popularity": 100, "preview_url": null, "track_number": 1, "type": "track", "uri": "spotify:track:2plbrEY59IikOBgBGLjaoe", "danceability": 0.521, "energy": 0.592, "key": 6, "loudness": -7.777, "mode": 0, "speechiness": 0.0304, "acousticness": 0.308, "instrumentalness": 0.0, "liveness": 0.122, "valence": 0.535, "tempo": 157.969, "time_signature": 3}, 
{"album": {"album_type": "album", "artists": [{"external_urls": {"spotify": "https://open.spotify.com/artist/2YZyLoL8N0Wb9xBt1NhZWg"}, "href": "https://api.spotify.com/v1/artists/2YZyLoL8N0Wb9xBt1NhZWg", "id": "2YZyLoL8N0Wb9xBt1NhZWg", "name": "Kendrick Lamar", "type": "artist", "uri": "spotify:artist:2YZyLoL8N0Wb9xBt1NhZWg"}], "available_markets": ["AR", "AU", "AT", "BE", "BO", "BR", "BG", "CA", "CL", "CO", "CR", "CY", "CZ", "DK", "DO", "DE", "EC", "EE", "SV", "FI", "FR", "GR", "GT", "HN", "HK", "HU", "IS", "IE", "IT", "LV", "LT", "LU", "MY", "MT", "MX", "NL", "NZ", "NI", "NO", "PA", "PY", "PE", "PH", "PL", "PT", "SG", "SK", "ES", "SE", "CH", "TW", "TR", "UY", "US", "GB", "AD", "LI", "MC", "ID", "JP", "TH", "VN", "RO", "IL", "ZA", "SA", "AE", "BH", "QA", "OM", "KW", "EG", "MA", "DZ", "TN", "LB", "JO", "PS", "IN", "KZ", "MD", "UA", "AL", "BA", "HR", "ME", "MK", "RS", "SI", "KR", "BD", "PK", "LK", "GH", "KE", "NG", "TZ", "UG", "AG", "AM", "BS", "BB", "BZ", "BT", "BW", "BF", "CV", "CW", "DM", "FJ", "GM", "GE", "GD", "GW", "GY", "HT", "JM", "KI", "LS", "LR", "MW", "MV", "ML", "MH", "FM", "NA", "NR", "NE", "PW", "PG", "WS", "SM", "ST", "SN", "SC", "SL", "SB", "KN", "LC", "VC", "SR", "TL", "TO", "TT", "TV", "VU", "AZ", "BN", "BI", "KH", "CM", "TD", "KM", "GQ", "SZ", "GA", "GN", "KG", "LA", "MO", "MR", "MN", "NP", "RW", "TG", "UZ", "ZW", "BJ", "MG", "MU", "MZ", "AO", "CI", "DJ", "ZM", "CD", "CG", "IQ", "LY", "TJ", "VE", "ET", "XK"], "external_urls": {"spotify": "https://open.spotify.com/album/1Ss0ArMRr91m83mOgRBjSZ"}, "href": "https://api.spotify.com/v1/albums/1Ss0ArMRr91m83mOgRBjSZ", "id": "1Ss0ArMRr91m83mOgRBjSZ", "images": [{"url": "https://i.scdn.co/image/ab67616d0000b27309d6ed214f03fbb663e46531", "width": 640, "height": 640}, {"url": "https://i.scdn.co/image/ab67616d00001e0209d6ed214f03fbb663e46531", "width": 300, "height": 300}, {"url": "https://i.scdn.co/image/ab67616d0000485109d6ed214f03fbb663e46531", "width": 64, "height": 64}], "name": "GNX", "release_date": "2024-11-21", "release_date_precision": "day", "total_tracks": 12, "type": "album", "uri": "spotify:album:1Ss0ArMRr91m83mOgRBjSZ"}, "artists": [{"external_urls": {"spotify": "https://open.spotify.com/artist/2YZyLoL8N0Wb9xBt1NhZWg"}, "href": "https://api.spotify.com/v1/artists/2YZyLoL8N0Wb9xBt1NhZWg", "id": "2YZyLoL8N0Wb9xBt1NhZWg", "name": "Kendrick Lamar", "type": "artist", "uri": "spotify:artist:2YZyLoL8N0Wb9xBt1NhZWg"}, {"external_urls": {"spotify": "https://open.spotify.com/artist/7tYKF4w9nC0nq9CsPZTHyP"}, "href": "https://api.spotify.com/v1/artists/7tYKF4w9nC0nq9CsPZTHyP", "id": "7tYKF4w9nC0nq9CsPZTHyP", "name": "SZA", "type": "artist", "uri": "spotify:artist:7tYKF4w9nC0nq9CsPZTHyP"}], "available_markets": ["AR", "AU", "AT", "BE", "BO", "BR", "BG", "CA", "CL", "CO", "CR", "CY", "CZ", "DK", "DO", "DE", "EC", "EE", "SV", "FI", "FR", "GR", "GT", "HN", "HK", "HU", "IS", "IE", "IT", "LV", "LT", "LU", "MY", "MT", "MX", "NL", "NZ", "NI", "NO", "PA", "PY", "PE", "PH", "PL", "PT", "SG", "SK", "ES", "SE", "CH", "TW", "TR", "UY", "US", "GB", "AD", "LI", "MC", "ID", "JP", "TH", "VN", "RO", "IL", "ZA", "SA", "AE", "BH", "QA", "OM", "KW", "EG", "MA", "DZ", "TN", "LB", "JO", "PS", "IN", "KZ", "MD", "UA", "AL", "BA", "HR", "ME", "MK", "RS", "SI", "KR", "BD", "PK", "LK", "GH", "KE", "NG", "TZ", "UG", "AG", "AM", "BS", "BB", "BZ", "BT", "BW", "BF", "CV", "CW", "DM", "FJ", "GM", "GE", "GD", "GW", "GY", "HT", "JM", "KI", "LS", "LR", "MW", "MV", "ML", "MH", "FM", "NA", "NR", "NE", "PW", "PG", "WS", "SM", "ST", "SN", "SC", "SL", "SB", "KN", "LC", "VC", "SR", "TL", "TO", "TT", "TV", "VU", "AZ", "BN", "BI", "KH", "CM", "TD", "KM", "GQ", "SZ", "GA", "GN", "KG", "LA", "MO", "MR", "MN", "NP", "RW", "TG", "UZ", "ZW", "BJ", "MG", "MU", "MZ", "AO", "CI", "DJ", "ZM", "CD", "CG", "IQ", "LY", "TJ", "VE", "ET", "XK"], "disc_number": 1, "duration_ms": 177598, "explicit": false, "external_ids": {"isrc": "USUG12408496"}, "external_urls": {"spotify": "https://open.spotify.com/track/2CGNAOSuO1MEFCbBRgUzjd"}, "href": "https://api.spotify.com/v1/tracks/2CGNAOSuO1MEFCbBRgUzjd", "id": "2CGNAOSuO1MEFCbBRgUzjd", "is_local": false, "name": "luther (with sza)", "popularity": 81, "preview_url": null, "track_number": 3, "type": "track", "uri": "spotify:track:2CGNAOSuO1MEFCbBRgUzjd", "danceability": 0.707, "energy": 0.575, "key": 2, "loudness": -7.546, "mode": 1, "speechiness": 0.125, "acousticness": 0.251, "instrumentalness": 0.0, "liveness": 0.248, "valence": 0.576, "tempo": 138.008, "time_signature": 4},
{"album": {"album_type": "album", "artists": [{"external_urls": {"spotify": "https://open.spotify.com/artist/2YZyLoL8N0Wb9xBt1NhZWg"}, "href": "https://api.spotify.com/v1/artists/2YZyLoL8N0Wb9xBt1NhZWg", "id": "2YZyLoL8N0Wb9xBt1NhZWg", "name": "Kendrick Lamar", "type": "artist", "uri": "spotify:artist:2YZyLoL8N0Wb9xBt1NhZWg"}], "available_markets": ["AR", "AU", "AT", "BE", "BO", "BR", "BG", "CA", "CL", "CO", "CR", "CY", "CZ", "DK", "DO", "DE", "EC", "EE", "SV", "FI", "FR", "GR", "GT", "HN", "HK", "HU", "IS", "IE", "IT", "LV", "LT", "LU", "MY", "MT", "MX", "NL", "NZ", "NI", "NO", "PA", "PY", "PE", "PH", "PL", "PT", "SG", "SK", "ES", "SE", "CH", "TW", "TR", "UY", "US", "GB", "AD", "LI", "MC", "ID", "JP", "TH", "VN", "RO", "IL", "ZA", "SA", "AE", "BH", "QA", "OM", "KW", "EG", "MA", "DZ", "TN", "LB", "JO", "PS", "IN", "KZ", "MD", "UA", "AL", "BA", "HR", "ME", "MK", "RS", "SI", "KR", "BD", "PK", "LK", "GH", "KE", "NG", "TZ", "UG", "AG", "AM", "BS", "BB", "BZ", "BT", "BW", "BF", "CV", "CW", "DM", "FJ", "GM", "GE", "GD", "GW", "GY", "HT", "JM", "KI", "LS", "LR", "MW", "MV", "ML", "MH", "FM", "NA", "NR", "NE", "PW", "PG", "WS", "SM", "ST", "SN", "SC", "SL", "SB", "KN", "LC", "VC", "SR", "TL", "TO", "TT", "TV", "VU", "AZ", "BN", "BI", "KH", "CM", "TD", "KM", "GQ", "SZ", "GA", "GN", "KG", "LA", "MO", "MR", "MN", "NP", "RW", "TG", "UZ", "ZW", "BJ", "MG", "MU", "MZ", "AO", "CI", "DJ", "ZM", "CD", "CG", "IQ", "LY", "TJ", "VE", "ET", "XK"], "external_urls": {"spotify": "https://open.spotify.com/album/0hvT3yIEysuuvkK73vgdcW"}, "href": "https://api.spotify.com/v1/albums/0hvT3yIEysuuvkK73vgdcW", "id": "0hvT3yIEysuuvkK73vgdcW", "images": [{"url": "https://i.scdn.co/image/ab67616d0000b273d9985092cd88bffd97653b58", "width": 640, "height": 640}, {"url": "https://i.scdn.co/image/ab67616d00001e02d9985092cd88bffd97653b58", "width": 300, "height": 300}, {"url": "https://i.scdn.co/image/ab67616d00004851d9985092cd88bffd97653b58", "width": 64, "height": 64}], "name": "GNX", "release_date": "2024-11-22", "release_date_precision": "day", "total_tracks": 12, "type": "album", "uri": "spotify:album:0hvT3yIEysuuvkK73vgdcW"}, "artists": [{"external_urls": {"spotify": "https://open.spotify.com/artist/2YZyLoL8N0Wb9xBt1NhZWg"}, "href": "https://api.spotify.com/v1/artists/2YZyLoL8N0Wb9xBt1NhZWg", "id": "2YZyLoL8N0Wb9xBt1NhZWg", "name": "Kendrick Lamar", "type": "artist", "uri": "spotify:artist:2YZyLoL8N0Wb9xBt1NhZWg"}], "available_markets": ["AR", "AU", "AT", "BE", "BO", "BR", "BG", "CA", "CL", "CO", "CR", "CY", "CZ", "DK", "DO", "DE", "EC", "EE", "SV", "FI", "FR", "GR", "GT", "HN", "HK", "HU", "IS", "IE", "IT", "LV", "LT", "LU", "MY", "MT", "MX", "NL", "NZ", "NI", "NO", "PA", "PY", "PE", "PH", "PL", "PT", "SG", "SK", "ES", "SE", "CH", "TW", "TR", "UY", "US", "GB", "AD", "LI", "MC", "ID", "JP", "TH", "VN", "RO", "IL", "ZA", "SA", "AE", "BH", "QA", "OM", "KW", "EG", "MA", "DZ", "TN", "LB", "JO", "PS", "IN", "KZ", "MD", "UA", "AL", "BA", "HR", "ME", "MK", "RS", "SI", "KR", "BD", "PK", "LK", "GH", "KE", "NG", "TZ", "UG", "AG", "AM", "BS", "BB", "BZ", "BT", "BW", "BF", "CV", "CW", "DM", "FJ", "GM", "GE", "GD", "GW", "GY", "HT", "JM", "KI", "LS", "LR", "MW", "MV", "ML", "MH", "FM", "NA", "NR", "NE", "PW", "PG", "WS", "SM", "ST", "SN", "SC", "SL", "SB", "KN", "LC", "VC", "SR", "TL", "TO", "TT", "TV", "VU", "AZ", "BN", "BI", "KH", "CM", "TD", "KM", "GQ", "SZ", "GA", "GN", "KG", "LA", "MO", "MR", "MN", "NP", "RW", "TG", "UZ", "ZW", "BJ", "MG", "MU", "MZ", "AO", "CI", "DJ", "ZM", "CD", "CG", "IQ", "LY", "TJ", "VE", "ET", "XK"], "disc_number": 1, "duration_ms": 157992, "explicit": true, "external_ids": {"isrc": "USUG12408494"}, "external_urls": {"spotify": "https://open.spotify.com/track/0nj9Bq5sHDiTxSHunhgkFb"}, "href": "https://api.spotify.com/v1/tracks/0nj9Bq5sHDiTxSHunhgkFb", "id": "0nj9Bq5sHDiTxSHunhgkFb", "is_local": false, "name": "squabble up", "popularity": 91, "preview_url": null, "track_number": 2, "type": "track", "uri": "spotify:track:0nj9Bq5sHDiTxSHunhgkFb", "danceability": 0.874, "energy": 0.672, "key": 0, "loudness": -5.568, "mode": 1, "speechiness": 0.198, "acousticness": 0.0206, "instrumentalness": 0.0, "liveness": 0.0783, "valence": 0.711, "tempo": 103.921, "time_signature": 4},
{"album": {"album_type": "album", "artists": [{"external_urls": {"spotify": "https://open.spotify.com/artist/2YZyLoL8N0Wb9xBt1NhZWg"}, "href": "https://api.spotify.com/v1/artists/2YZyLoL8N0Wb9xBt1NhZWg", "id": "2YZyLoL8N0Wb9xBt1NhZWg", "name": "Kendrick Lamar", "type": "artist", "uri": "spotify:artist:2YZyLoL8N0Wb9xBt1NhZWg"}], "available_markets": ["AR", "AU", "AT", "BE", "BO", "BR", "BG", "CA", "CL", "CO", "CR", "CY", "CZ", "DK", "DO", "DE", "EC", "EE", "SV", "FI", "FR", "GR", "GT", "HN", "HK", "HU", "IS", "IE", "IT", "LV", "LT", "LU", "MY", "MT", "MX", "NL", "NZ", "NI", "NO", "PA", "PY", "PE", "PH", "PL", "PT", "SG", "SK", "ES", "SE", "CH", "TW", "TR", "UY", "US", "GB", "AD", "LI", "MC", "ID", "JP", "TH", "VN", "RO", "IL", "ZA", "SA", "AE", "BH", "QA", "OM", "KW", "EG", "MA", "DZ", "TN", "LB", "JO", "PS", "IN", "KZ", "MD", "UA", "AL", "BA", "HR", "ME", "MK", "RS", "SI", "KR", "BD", "PK", "LK", "GH", "KE", "NG", "TZ", "UG", "AG", "AM", "BS", "BB", "BZ", "BT", "BW", "BF", "CV", "CW", "DM", "FJ", "GM", "GE", "GD", "GW", "GY", "HT", "JM", "KI", "LS", "LR", "MW", "MV", "ML", "MH", "FM", "NA", "NR", "NE", "PW", "PG", "WS", "SM", "ST", "SN", "SC", "SL", "SB", "KN", "LC", "VC", "SR", "TL", "TO", "TT", "TV", "VU", "AZ", "BN", "BI", "KH", "CM", "TD", "KM", "GQ", "SZ", "GA", "GN", "KG", "LA", "MO", "MR", "MN", "NP", "RW", "TG", "UZ", "ZW", "BJ", "MG", "MU", "MZ", "AO", "CI", "DJ", "ZM", "CD", "CG", "IQ", "LY", "TJ", "VE", "ET", "XK"], "external_urls": {"spotify": "https://open.spotify.com/album/0hvT3yIEysuuvkK73vgdcW"}, "href": "https://api.spotify.com/v1/albums/0hvT3yIEysuuvkK73vgdcW", "id": "0hvT3yIEysuuvkK73vgdcW", "images": [{"url": "https://i.scdn.co/image/ab67616d0000b273d9985092cd88bffd97653b58", "width": 640, "height": 640}, {"url": "https://i.scdn.co/image/ab67616d00001e02d9985092cd88bffd97653b58", "width": 300, "height": 300}, {"url": "https://i.scdn.co/image/ab67616d00004851d9985092cd88bffd97653b58", "width": 64, "height": 64}], "name": "GNX", "release_date": "2024-11-22", "release_date_precision": "day", "total_tracks": 12, "type": "album", "uri": "spotify:album:0hvT3yIEysuuvkK73vgdcW"}, "artists": [{"external_urls": {"spotify": "https://open.spotify.com/artist/2YZyLoL8N0Wb9xBt1NhZWg"}, "href": "https://api.spotify.com/v1/artists/2YZyLoL8N0Wb9xBt1NhZWg", "id": "2YZyLoL8N0Wb9xBt1NhZWg", "name": "Kendrick Lamar", "type": "artist", "uri": "spotify:artist:2YZyLoL8N0Wb9xBt1NhZWg"}, {"external_urls": {"spotify": "https://open.spotify.com/artist/1jiZvw42D4oquLl24x2VWV"}, "href": "https://api.spotify.com/v1/artists/1jiZvw42D4oquLl24x2VWV", "id": "1jiZvw42D4oquLl24x2VWV", "name": "Lefty Gunplay", "type": "artist", "uri": "spotify:artist:1jiZvw42D4oquLl24x2VWV"}], "available_markets": ["AR", "AU", "AT", "BE", "BO", "BR", "BG", "CA", "CL", "CO", "CR", "CY", "CZ", "DK", "DO", "DE", "EC", "EE", "SV", "FI", "FR", "GR", "GT", "HN", "HK", "HU", "IS", "IE", "IT", "LV", "LT", "LU", "MY", "MT", "MX", "NL", "NZ", "NI", "NO", "PA", "PY", "PE", "PH", "PL", "PT", "SG", "SK", "ES", "SE", "CH", "TW", "TR", "UY", "US", "GB", "AD", "LI", "MC", "ID", "JP", "TH", "VN", "RO", "IL", "ZA", "SA", "AE", "BH", "QA", "OM", "KW", "EG", "MA", "DZ", "TN", "LB", "JO", "PS", "IN", "KZ", "MD", "UA", "AL", "BA", "HR", "ME", "MK", "RS", "SI", "KR", "BD", "PK", "LK", "GH", "KE", "NG", "TZ", "UG", "AG", "AM", "BS", "BB", "BZ", "BT", "BW", "BF", "CV", "CW", "DM", "FJ", "GM", "GE", "GD", "GW", "GY", "HT", "JM", "KI", "LS", "LR", "MW", "MV", "ML", "MH", "FM", "NA", "NR", "NE", "PW", "PG", "WS", "SM", "ST", "SN", "SC", "SL", "SB", "KN", "LC", "VC", "SR", "TL", "TO", "TT", "TV", "VU", "AZ", "BN", "BI", "KH", "CM", "TD", "KM", "GQ", "SZ", "GA", "GN", "KG", "LA", "MO", "MR", "MN", "NP", "RW", "TG", "UZ", "ZW", "BJ", "MG", "MU", "MZ", "AO", "CI", "DJ", "ZM", "CD", "CG", "IQ", "LY", "TJ", "VE", "ET", "XK"], "disc_number": 1, "duration_ms": 220690, "explicit": true, "external_ids": {"isrc": "USUG12408493"}, "external_urls": {"spotify": "https://open.spotify.com/track/0aB0v4027ukVziUGwVGYpG"}, "href": "https://api.spotify.com/v1/tracks/0aB0v4027ukVziUGwVGYpG", "id": "0aB0v4027ukVziUGwVGYpG", "is_local": false, "name": "tv off (feat. lefty gunplay)", "popularity": 91, "preview_url": null, "track_number": 7, "type": "track", "uri": "spotify:track:0aB0v4027ukVziUGwVGYpG", "danceability": 0.855, "energy": 0.529, "key": 6, "loudness": -6.679, "mode": 0, "speechiness": 0.263, "acousticness": 0.0837, "instrumentalness": 0.0, "liveness": 0.423, "valence": 0.548, "tempo": 100.036, "time_signature": 4},
{"album": {"album_type": "album", "artists": [{"external_urls": {"spotify": "https://open.spotify.com/artist/6qqNVTkY8uBg9cP3Jd7DAH"}, "href": "https://api.spotify.com/v1/artists/6qqNVTkY8uBg9cP3Jd7DAH", "id": "6qqNVTkY8uBg9cP3Jd7DAH", "name": "Billie Eilish", "type": "artist", "uri": "spotify:artist:6qqNVTkY8uBg9cP3Jd7DAH"}], "available_markets": ["AR", "AU", "AT", "BE", "BO", "BR", "BG", "CA", "CL", "CO", "CR", "CY", "CZ", "DK", "DO", "DE", "EC", "EE", "SV", "FI", "FR", "GR", "GT", "HN", "HK", "HU", "IS", "IE", "IT", "LV", "LT", "LU", "MY", "MT", "MX", "NL", "NZ", "NI", "NO", "PA", "PY", "PE", "PH", "PL", "PT", "SG", "SK", "ES", "SE", "CH", "TW", "TR", "UY", "US", "GB", "AD", "LI", "MC", "ID", "JP", "TH", "VN", "RO", "IL", "ZA", "SA", "AE", "BH", "QA", "OM", "KW", "EG", "MA", "DZ", "TN", "LB", "JO", "PS", "IN", "KZ", "MD", "UA", "AL", "BA", "HR", "ME", "MK", "RS", "SI", "KR", "BD", "PK", "LK", "GH", "KE", "NG", "TZ", "UG", "AG", "AM", "BS", "BB", "BZ", "BT", "BW", "BF", "CV", "CW", "DM", "FJ", "GM", "GE", "GD", "GW", "GY", "HT", "JM", "KI", "LS", "LR", "MW", "MV", "ML", "MH", "FM", "NA", "NR", "NE", "PW", "PG", "WS", "SM", "ST", "SN", "SC", "SL", "SB", "KN", "LC", "VC", "SR", "TL", "TO", "TT", "TV", "VU", "AZ", "BN", "BI", "KH", "CM", "TD", "KM", "GQ", "SZ", "GA", "GN", "KG", "LA", "MO", "MR", "MN", "NP", "RW", "TG", "UZ", "ZW", "BJ", "MG", "MU", "MZ", "AO", "CI", "DJ", "ZM", "CD", "CG", "IQ", "LY", "TJ", "VE", "ET", "XK"], "external_urls": {"spotify": "https://open.spotify.com/album/7aJuG4TFXa2hmE4z1yxc3n"}, "href": "https://api.spotify.com/v1/albums/7aJuG4TFXa2hmE4z1yxc3n", "id": "7aJuG4TFXa2hmE4z1yxc3n", "images": [{"url": "https://i.scdn.co/image/ab67616d0000b27371d62ea7ea8a5be92d3c1f62", "width": 640, "height": 640}, {"url": "https://i.scdn.co/image/ab67616d00001e0271d62ea7ea8a5be92d3c1f62", "width": 300, "height": 300}, {"url": "https://i.scdn.co/image/ab67616d0000485171d62ea7ea8a5be92d3c1f62", "width": 64, "height": 64}], "name": "HIT ME HARD AND SOFT", "release_date": "2024-05-17", "release_date_precision": "day", "total_tracks": 10, "type": "album", "uri": "spotify:album:7aJuG4TFXa2hmE4z1yxc3n"}, "artists": [{"external_urls": {"spotify": "https://open.spotify.com/artist/6qqNVTkY8uBg9cP3Jd7DAH"}, "href": "https://api.spotify.com/v1/artists/6qqNVTkY8uBg9cP3Jd7DAH", "id": "6qqNVTkY8uBg9cP3Jd7DAH", "name": "Billie Eilish", "type": "artist", "uri": "spotify:artist:6qqNVTkY8uBg9cP3Jd7DAH"}], "available_markets": ["AR", "AU", "AT", "BE", "BO", "BR", "BG", "CA", "CL", "CO", "CR", "CY", "CZ", "DK", "DO", "DE", "EC", "EE", "SV", "FI", "FR", "GR", "GT", "HN", "HK", "HU", "IS", "IE", "IT", "LV", "LT", "LU", "MY", "MT", "MX", "NL", "NZ", "NI", "NO", "PA", "PY", "PE", "PH", "PL", "PT", "SG", "SK", "ES", "SE", "CH", "TW", "TR", "UY", "US", "GB", "AD", "LI", "MC", "ID", "JP", "TH", "VN", "RO", "IL", "ZA", "SA", "AE", "BH", "QA", "OM", "KW", "EG", "MA", "DZ", "TN", "LB", "JO", "PS", "IN", "KZ", "MD", "UA", "AL", "BA", "HR", "ME", "MK", "RS", "SI", "KR", "BD", "PK", "LK", "GH", "KE", "NG", "TZ", "UG", "AG", "AM", "BS", "BB", "BZ", "BT", "BW", "BF", "CV", "CW", "DM", "FJ", "GM", "GE", "GD", "GW", "GY", "HT", "JM", "KI", "LS", "LR", "MW", "MV", "ML", "MH", "FM", "NA", "NR", "NE", "PW", "PG", "WS", "SM", "ST", "SN", "SC", "SL", "SB", "KN", "LC", "VC", "SR", "TL", "TO", "TT", "TV", "VU", "AZ", "BN", "BI", "KH", "CM", "TD", "KM", "GQ", "SZ", "GA", "GN", "KG", "LA", "MO", "MR", "MN", "NP", "RW", "TG", "UZ", "ZW", "BJ", "MG", "MU", "MZ", "AO", "CI", "DJ", "ZM", "CD", "CG", "IQ", "LY", "TJ", "VE", "ET", "XK"], "disc_number": 1, "duration_ms": 210373, "explicit": false, "external_ids": {"isrc": "USUM72401994"}, "external_urls": {"spotify": "https://open.spotify.com/track/6dOtVTDdiauQNBQEDOtlAB"}, "href": "https://api.spotify.com/v1/tracks/6dOtVTDdiauQNBQEDOtlAB", "id": "6dOtVTDdiauQNBQEDOtlAB", "is_local": false, "name": "BIRDS OF A FEATHER", "popularity": 97, "preview_url": null, "track_number": 4, "type": "track", "uri": "spotify:track:6dOtVTDdiauQNBQEDOtlAB", "danceability": 0.747, "energy": 0.507, "key": 2, "loudness": -10.171, "mode": 1, "speechiness": 0.0358, "acousticness": 0.2, "instrumentalness": 0.0608, "liveness": 0.117, "valence": 0.438, "tempo": 104.978, "time_signature": 4},
{"album": {"album_type": "album", "artists": [{"external_urls": {"spotify": "https://open.spotify.com/artist/4tuJ0bMpJh08umKkEXKUI5"}, "href": "https://api.spotify.com/v1/artists/4tuJ0bMpJh08umKkEXKUI5", "id": "4tuJ0bMpJh08umKkEXKUI5", "name": "Gracie Abrams", "type": "artist", "uri": "spotify:artist:4tuJ0bMpJh08umKkEXKUI5"}], "available_markets": ["AR", "AU", "AT", "BE", "BO", "BR", "BG", "CA", "CL", "CO", "CR", "CY", "CZ", "DK", "DO", "DE", "EC", "EE", "SV", "FI", "FR", "GR", "GT", "HN", "HK", "HU", "IS", "IE", "IT", "LV", "LT", "LU", "MY", "MT", "MX", "NL", "NZ", "NI", "NO", "PA", "PY", "PE", "PH", "PL", "PT", "SG", "SK", "ES", "SE", "CH", "TW", "TR", "UY", "US", "GB", "AD", "LI", "MC", "ID", "JP", "TH", "VN", "RO", "IL", "ZA", "SA", "AE", "BH", "QA", "OM", "KW", "EG", "MA", "DZ", "TN", "LB", "JO", "PS", "IN", "KZ", "MD", "UA", "AL", "BA", "HR", "ME", "MK", "RS", "SI", "KR", "BD", "PK", "LK", "GH", "KE", "NG", "TZ", "UG", "AG", "AM", "BS", "BB", "BZ", "BT", "BW", "BF", "CV", "CW", "DM", "FJ", "GM", "GE", "GD", "GW", "GY", "HT", "JM", "KI", "LS", "LR", "MW", "MV", "ML", "MH", "FM", "NA", "NR", "NE", "PW", "PG", "WS", "SM", "ST", "SN", "SC", "SL", "SB", "KN", "LC", "VC", "SR", "TL", "TO", "TT", "TV", "VU", "AZ", "BN", "BI", "KH", "CM", "TD", "KM", "GQ", "SZ", "GA", "GN", "KG", "LA", "MO", "MR", "MN", "NP", "RW", "TG", "UZ", "ZW", "BJ", "MG", "MU", "MZ", "AO", "CI", "DJ", "ZM", "CD", "CG", "IQ", "LY", "TJ", "VE", "ET", "XK"], "external_urls": {"spotify": "https://open.spotify.com/album/0hBRqPYPXhr1RkTDG3n4Mk"}, "href": "https://api.spotify.com/v1/albums/0hBRqPYPXhr1RkTDG3n4Mk", "id": "0hBRqPYPXhr1RkTDG3n4Mk", "images": [{"url": "https://i.scdn.co/image/ab67616d0000b2731dac3694b3289cd903cb3acf", "width": 640, "height": 640}, {"url": "https://i.scdn.co/image/ab67616d00001e021dac3694b3289cd903cb3acf", "width": 300, "height": 300}, {"url": "https://i.scdn.co/image/ab67616d000048511dac3694b3289cd903cb3acf", "width": 64, "height": 64}], "name": "The Secret of Us (Deluxe)", "release_date": "2024-10-18", "release_date_precision": "day", "total_tracks": 20, "type": "album", "uri": "spotify:album:0hBRqPYPXhr1RkTDG3n4Mk"}, "artists": [{"external_urls": {"spotify": "https://open.spotify.com/artist/4tuJ0bMpJh08umKkEXKUI5"}, "href": "https://api.spotify.com/v1/artists/4tuJ0bMpJh08umKkEXKUI5", "id": "4tuJ0bMpJh08umKkEXKUI5", "name": "Gracie Abrams", "type": "artist", "uri": "spotify:artist:4tuJ0bMpJh08umKkEXKUI5"}], "available_markets": ["AR", "AU", "AT", "BE", "BO", "BR", "BG", "CA", "CL", "CO", "CR", "CY", "CZ", "DK", "DO", "DE", "EC", "EE", "SV", "FI", "FR", "GR", "GT", "HN", "HK", "HU", "IS", "IE", "IT", "LV", "LT", "LU", "MY", "MT", "MX", "NL", "NZ", "NI", "NO", "PA", "PY", "PE", "PH", "PL", "PT", "SG", "SK", "ES", "SE", "CH", "TW", "TR", "UY", "US", "GB", "AD", "LI", "MC", "ID", "JP", "TH", "VN", "RO", "IL", "ZA", "SA", "AE", "BH", "QA", "OM", "KW", "EG", "MA", "DZ", "TN", "LB", "JO", "PS", "IN", "KZ", "MD", "UA", "AL", "BA", "HR", "ME", "MK", "RS", "SI", "KR", "BD", "PK", "LK", "GH", "KE", "NG", "TZ", "UG", "AG", "AM", "BS", "BB", "BZ", "BT", "BW", "BF", "CV", "CW", "DM", "FJ", "GM", "GE", "GD", "GW", "GY", "HT", "JM", "KI", "LS", "LR", "MW", "MV", "ML", "MH", "FM", "NA", "NR", "NE", "PW", "PG", "WS", "SM", "ST", "SN", "SC", "SL", "SB", "KN", "LC", "VC", "SR", "TL", "TO", "TT", "TV", "VU", "AZ", "BN", "BI", "KH", "CM", "TD", "KM", "GQ", "SZ", "GA", "GN", "KG", "LA", "MO", "MR", "MN", "NP", "RW", "TG", "UZ", "ZW", "BJ", "MG", "MU", "MZ", "AO", "CI", "DJ", "ZM", "CD", "CG", "IQ", "LY", "TJ", "VE", "ET", "XK"], "disc_number": 1, "duration_ms": 166300, "explicit": true, "external_ids": {"isrc": "USUG12406903"}, "external_urls": {"spotify": "https://open.spotify.com/track/7ne4VBA60CxGM75vw0EYad"}, "href": "https://api.spotify.com/v1/tracks/7ne4VBA60CxGM75vw0EYad", "id": "7ne4VBA60CxGM75vw0EYad", "is_local": false, "name": "That\u2019s So True", "popularity": 95, "preview_url": null, "track_number": 15, "type": "track", "uri": "spotify:track:7ne4VBA60CxGM75vw0EYad", "danceability": 0.554, "energy": 0.808, "key": 1, "loudness": -4.169, "mode": 1, "speechiness": 0.0368, "acousticness": 0.214, "instrumentalness": 0.0, "liveness": 0.159, "valence": 0.372, "tempo": 108.548, "time_signature": 4},
{"album": {"album_type": "single", "artists": [{"external_urls": {"spotify": "https://open.spotify.com/artist/5j4HeCoUlzhfWtjAfM1acR"}, "href": "https://api.spotify.com/v1/artists/5j4HeCoUlzhfWtjAfM1acR", "id": "5j4HeCoUlzhfWtjAfM1acR", "name": "Stromae", "type": "artist", "uri": "spotify:artist:5j4HeCoUlzhfWtjAfM1acR"}, {"external_urls": {"spotify": "https://open.spotify.com/artist/6e3pZKXUxrPfnUPJ960Hd9"}, "href": "https://api.spotify.com/v1/artists/6e3pZKXUxrPfnUPJ960Hd9", "id": "6e3pZKXUxrPfnUPJ960Hd9", "name": "Pomme", "type": "artist", "uri": "spotify:artist:6e3pZKXUxrPfnUPJ960Hd9"}, {"external_urls": {"spotify": "https://open.spotify.com/artist/57nPqD7z62gDdq37US9XJR"}, "href": "https://api.spotify.com/v1/artists/57nPqD7z62gDdq37US9XJR", "id": "57nPqD7z62gDdq37US9XJR", "name": "Arcane", "type": "artist", "uri": "spotify:artist:57nPqD7z62gDdq37US9XJR"}], "available_markets": ["AR", "AU", "AT", "BE", "BO", "BR", "BG", "CA", "CL", "CO", "CR", "CY", "CZ", "DK", "DO", "DE", "EC", "EE", "SV", "FI", "FR", "GR", "GT", "HN", "HU", "IS", "IE", "IT", "LV", "LT", "LU", "MY", "MT", "MX", "NL", "NZ", "NI", "NO", "PA", "PY", "PE", "PH", "PL", "PT", "SG", "SK", "ES", "SE", "CH", "TR", "UY", "US", "GB", "AD", "LI", "MC", "ID", "JP", "TH", "VN", "RO", "IL", "ZA", "SA", "AE", "BH", "QA", "OM", "KW", "EG", "MA", "DZ", "TN", "LB", "JO", "PS", "IN", "BY", "KZ", "MD", "UA", "AL", "BA", "HR", "ME", "MK", "RS", "SI", "KR", "BD", "PK", "LK", "GH", "KE", "NG", "TZ", "UG", "AG", "AM", "BS", "BB", "BZ", "BT", "BW", "BF", "CV", "CW", "DM", "FJ", "GM", "GE", "GD", "GW", "GY", "HT", "JM", "KI", "LS", "LR", "MW", "MV", "ML", "MH", "FM", "NA", "NR", "NE", "PW", "PG", "PR", "WS", "SM", "ST", "SN", "SC", "SL", "SB", "KN", "LC", "VC", "SR", "TL", "TO", "TT", "TV", "VU", "AZ", "BN", "BI", "KH", "CM", "TD", "KM", "GQ", "SZ", "GA", "GN", "KG", "LA", "MR", "MN", "NP", "RW", "TG", "UZ", "ZW", "BJ", "MG", "MU", "MZ", "AO", "CI", "DJ", "ZM", "CD", "CG", "IQ", "LY", "TJ", "VE", "ET", "XK"], "external_urls": {"spotify": "https://open.spotify.com/album/3ZZlKPrWKSVI28zT3AGLQB"}, "href": "https://api.spotify.com/v1/albums/3ZZlKPrWKSVI28zT3AGLQB", "id": "3ZZlKPrWKSVI28zT3AGLQB", "images": [{"url": "https://i.scdn.co/image/ab67616d0000b2732aab4ea84f431ad7d92fecbb", "width": 640, "height": 640}, {"url": "https://i.scdn.co/image/ab67616d00001e022aab4ea84f431ad7d92fecbb", "width": 300, "height": 300}, {"url": "https://i.scdn.co/image/ab67616d000048512aab4ea84f431ad7d92fecbb", "width": 64, "height": 64}], "name": "Ma Meilleure Ennemie (from the series Arcane League of Legends)", "release_date": "2024-11-23", "release_date_precision": "day", "total_tracks": 1, "type": "album", "uri": "spotify:album:3ZZlKPrWKSVI28zT3AGLQB"}, "artists": [{"external_urls": {"spotify": "https://open.spotify.com/artist/5j4HeCoUlzhfWtjAfM1acR"}, "href": "https://api.spotify.com/v1/artists/5j4HeCoUlzhfWtjAfM1acR", "id": "5j4HeCoUlzhfWtjAfM1acR", "name": "Stromae", "type": "artist", "uri": "spotify:artist:5j4HeCoUlzhfWtjAfM1acR"}, {"external_urls": {"spotify": "https://open.spotify.com/artist/6e3pZKXUxrPfnUPJ960Hd9"}, "href": "https://api.spotify.com/v1/artists/6e3pZKXUxrPfnUPJ960Hd9", "id": "6e3pZKXUxrPfnUPJ960Hd9", "name": "Pomme", "type": "artist", "uri": "spotify:artist:6e3pZKXUxrPfnUPJ960Hd9"}, {"external_urls": {"spotify": "https://open.spotify.com/artist/57nPqD7z62gDdq37US9XJR"}, "href": "https://api.spotify.com/v1/artists/57nPqD7z62gDdq37US9XJR", "id": "57nPqD7z62gDdq37US9XJR", "name": "Arcane", "type": "artist", "uri": "spotify:artist:57nPqD7z62gDdq37US9XJR"}], "available_markets": ["AR", "AU", "AT", "BE", "BO", "BR", "BG", "CA", "CL", "CO", "CR", "CY", "CZ", "DK", "DO", "DE", "EC", "EE", "SV", "FI", "FR", "GR", "GT", "HN", "HU", "IS", "IE", "IT", "LV", "LT", "LU", "MY", "MT", "MX", "NL", "NZ", "NI", "NO", "PA", "PY", "PE", "PH", "PL", "PT", "SG", "SK", "ES", "SE", "CH", "TR", "UY", "US", "GB", "AD", "LI", "MC", "ID", "JP", "TH", "VN", "RO", "IL", "ZA", "SA", "AE", "BH", "QA", "OM", "KW", "EG", "MA", "DZ", "TN", "LB", "JO", "PS", "IN", "BY", "KZ", "MD", "UA", "AL", "BA", "HR", "ME", "MK", "RS", "SI", "KR", "BD", "PK", "LK", "GH", "KE", "NG", "TZ", "UG", "AG", "AM", "BS", "BB", "BZ", "BT", "BW", "BF", "CV", "CW", "DM", "FJ", "GM", "GE", "GD", "GW", "GY", "HT", "JM", "KI", "LS", "LR", "MW", "MV", "ML", "MH", "FM", "NA", "NR", "NE", "PW", "PG", "PR", "WS", "SM", "ST", "SN", "SC", "SL", "SB", "KN", "LC", "VC", "SR", "TL", "TO", "TT", "TV", "VU", "AZ", "BN", "BI", "KH", "CM", "TD", "KM", "GQ", "SZ", "GA", "GN", "KG", "LA", "MR", "MN", "NP", "RW", "TG", "UZ", "ZW", "BJ", "MG", "MU", "MZ", "AO", "CI", "DJ", "ZM", "CD", "CG", "IQ", "LY", "TJ", "VE", "ET", "XK"], "disc_number": 1, "duration_ms": 147973, "explicit": false, "external_ids": {"isrc": "USA2P2459602"}, "external_urls": {"spotify": "https://open.spotify.com/track/4lriIG2vNqwDWzOj2I9rtj"}, "href": "https://api.spotify.com/v1/tracks/4lriIG2vNqwDWzOj2I9rtj", "id": "4lriIG2vNqwDWzOj2I9rtj", "is_local": false, "name": "Ma Meilleure Ennemie (from the series Arcane League of Legends)", "popularity": 89, "preview_url": null, "track_number": 1, "type": "track", "uri": "spotify:track:4lriIG2vNqwDWzOj2I9rtj", "danceability": 0.678, "energy": 0.604, "key": 4, "loudness": -7.926, "mode": 0, "speechiness": 0.0962, "acousticness": 0.00465, "instrumentalness": 0.000936, "liveness": 0.278, "valence": 0.374, "tempo": 88.0, "time_signature": 4},
{"album": {"album_type": "album", "artists": [{"external_urls": {"spotify": "https://open.spotify.com/artist/1oSPZhvZMIrWW5I41kPkkY"}, "href": "https://api.spotify.com/v1/artists/1oSPZhvZMIrWW5I41kPkkY", "id": "1oSPZhvZMIrWW5I41kPkkY", "name": "Jimin", "type": "artist", "uri": "spotify:artist:1oSPZhvZMIrWW5I41kPkkY"}], "available_markets": ["AR", "AU", "AT", "BE", "BO", "BR", "BG", "CA", "CL", "CO", "CR", "CY", "CZ", "DK", "DO", "DE", "EC", "EE", "SV", "FI", "FR", "GR", "GT", "HN", "HK", "HU", "IS", "IE", "IT", "LV", "LT", "LU", "MY", "MT", "MX", "NL", "NZ", "NI", "NO", "PA", "PY", "PE", "PH", "PL", "PT", "SG", "SK", "ES", "SE", "CH", "TW", "TR", "UY", "US", "GB", "AD", "LI", "MC", "ID", "JP", "TH", "VN", "RO", "IL", "ZA", "SA", "AE", "BH", "QA", "OM", "KW", "EG", "MA", "DZ", "TN", "LB", "JO", "PS", "IN", "BY", "KZ", "MD", "UA", "AL", "BA", "HR", "ME", "MK", "RS", "SI", "KR", "BD", "PK", "LK", "GH", "KE", "NG", "TZ", "UG", "AG", "AM", "BS", "BB", "BZ", "BT", "BW", "BF", "CV", "CW", "DM", "FJ", "GM", "GE", "GD", "GW", "GY", "HT", "JM", "KI", "LS", "LR", "MW", "MV", "ML", "MH", "FM", "NA", "NR", "NE", "PW", "PG", "PR", "WS", "SM", "ST", "SN", "SC", "SL", "SB", "KN", "LC", "VC", "SR", "TL", "TO", "TT", "TV", "VU", "AZ", "BN", "BI", "KH", "CM", "TD", "KM", "GQ", "SZ", "GA", "GN", "KG", "LA", "MO", "MR", "MN", "NP", "RW", "TG", "UZ", "ZW", "BJ", "MG", "MU", "MZ", "AO", "CI", "DJ", "ZM", "CD", "CG", "IQ", "LY", "TJ", "VE", "ET", "XK"], "external_urls": {"spotify": "https://open.spotify.com/album/15XcLhiVMlSOipUddTNDnr"}, "href": "https://api.spotify.com/v1/albums/15XcLhiVMlSOipUddTNDnr", "id": "15XcLhiVMlSOipUddTNDnr", "images": [{"url": "https://i.scdn.co/image/ab67616d0000b273f02c451189a709b9a952aaec", "width": 640, "height": 640}, {"url": "https://i.scdn.co/image/ab67616d00001e02f02c451189a709b9a952aaec", "width": 300, "height": 300}, {"url": "https://i.scdn.co/image/ab67616d00004851f02c451189a709b9a952aaec", "width": 64, "height": 64}], "name": "MUSE", "release_date": "2024-07-19", "release_date_precision": "day", "total_tracks": 7, "type": "album", "uri": "spotify:album:15XcLhiVMlSOipUddTNDnr"}, "artists": [{"external_urls": {"spotify": "https://open.spotify.com/artist/1oSPZhvZMIrWW5I41kPkkY"}, "href": "https://api.spotify.com/v1/artists/1oSPZhvZMIrWW5I41kPkkY", "id": "1oSPZhvZMIrWW5I41kPkkY", "name": "Jimin", "type": "artist", "uri": "spotify:artist:1oSPZhvZMIrWW5I41kPkkY"}], "available_markets": ["AR", "AU", "AT", "BE", "BO", "BR", "BG", "CA", "CL", "CO", "CR", "CY", "CZ", "DK", "DO", "DE", "EC", "EE", "SV", "FI", "FR", "GR", "GT", "HN", "HK", "HU", "IS", "IE", "IT", "LV", "LT", "LU", "MY", "MT", "MX", "NL", "NZ", "NI", "NO", "PA", "PY", "PE", "PH", "PL", "PT", "SG", "SK", "ES", "SE", "CH", "TW", "TR", "UY", "US", "GB", "AD", "LI", "MC", "ID", "JP", "TH", "VN", "RO", "IL", "ZA", "SA", "AE", "BH", "QA", "OM", "KW", "EG", "MA", "DZ", "TN", "LB", "JO", "PS", "IN", "BY", "KZ", "MD", "UA", "AL", "BA", "HR", "ME", "MK", "RS", "SI", "KR", "BD", "PK", "LK", "GH", "KE", "NG", "TZ", "UG", "AG", "AM", "BS", "BB", "BZ", "BT", "BW", "BF", "CV", "CW", "DM", "FJ", "GM", "GE", "GD", "GW", "GY", "HT", "JM", "KI", "LS", "LR", "MW", "MV", "ML", "MH", "FM", "NA", "NR", "NE", "PW", "PG", "PR", "WS", "SM", "ST", "SN", "SC", "SL", "SB", "KN", "LC", "VC", "SR", "TL", "TO", "TT", "TV", "VU", "AZ", "BN", "BI", "KH", "CM", "TD", "KM", "GQ", "SZ", "GA", "GN", "KG", "LA", "MO", "MR", "MN", "NP", "RW", "TG", "UZ", "ZW", "BJ", "MG", "MU", "MZ", "AO", "CI", "DJ", "ZM", "CD", "CG", "IQ", "LY", "TJ", "VE", "ET", "XK"], "disc_number": 1, "duration_ms": 170887, "explicit": false, "external_ids": {"isrc": "USA2P2431062"}, "external_urls": {"spotify": "https://open.spotify.com/track/7tI8dRuH2Yc6RuoTjxo4dU"}, "href": "https://api.spotify.com/v1/tracks/7tI8dRuH2Yc6RuoTjxo4dU", "id": "7tI8dRuH2Yc6RuoTjxo4dU", "is_local": false, "name": "Who", "popularity": 92, "preview_url": null, "track_number": 6, "type": "track", "uri": "spotify:track:7tI8dRuH2Yc6RuoTjxo4dU", "danceability": 0.66, "energy": 0.756, "key": 0, "loudness": -3.743, "mode": 0, "speechiness": 0.032, "acousticness": 0.00289, "instrumentalness": 0.0, "liveness": 0.193, "valence": 0.838, "tempo": 116.034, "time_signature": 4}, 
{"album": {"album_type": "album", "artists": [{"external_urls": {"spotify": "https://open.spotify.com/artist/2YZyLoL8N0Wb9xBt1NhZWg"}, "href": "https://api.spotify.com/v1/artists/2YZyLoL8N0Wb9xBt1NhZWg", "id": "2YZyLoL8N0Wb9xBt1NhZWg", "name": "Kendrick Lamar", "type": "artist", "uri": "spotify:artist:2YZyLoL8N0Wb9xBt1NhZWg"}], "available_markets": ["AR", "AU", "AT", "BE", "BO", "BR", "BG", "CA", "CL", "CO", "CR", "CY", "CZ", "DK", "DO", "DE", "EC", "EE", "SV", "FI", "FR", "GR", "GT", "HN", "HK", "HU", "IS", "IE", "IT", "LV", "LT", "LU", "MY", "MT", "MX", "NL", "NZ", "NI", "NO", "PA", "PY", "PE", "PH", "PL", "PT", "SG", "SK", "ES", "SE", "CH", "TW", "TR", "UY", "US", "GB", "AD", "LI", "MC", "ID", "JP", "TH", "VN", "RO", "IL", "ZA", "SA", "AE", "BH", "QA", "OM", "KW", "EG", "MA", "DZ", "TN", "LB", "JO", "PS", "IN", "KZ", "MD", "UA", "AL", "BA", "HR", "ME", "MK", "RS", "SI", "KR", "BD", "PK", "LK", "GH", "KE", "NG", "TZ", "UG", "AG", "AM", "BS", "BB", "BZ", "BT", "BW", "BF", "CV", "CW", "DM", "FJ", "GM", "GE", "GD", "GW", "GY", "HT", "JM", "KI", "LS", "LR", "MW", "MV", "ML", "MH", "FM", "NA", "NR", "NE", "PW", "PG", "WS", "SM", "ST", "SN", "SC", "SL", "SB", "KN", "LC", "VC", "SR", "TL", "TO", "TT", "TV", "VU", "AZ", "BN", "BI", "KH", "CM", "TD", "KM", "GQ", "SZ", "GA", "GN", "KG", "LA", "MO", "MR", "MN", "NP", "RW", "TG", "UZ", "ZW", "BJ", "MG", "MU", "MZ", "AO", "CI", "DJ", "ZM", "CD", "CG", "IQ", "LY", "TJ", "VE", "ET", "XK"], "external_urls": {"spotify": "https://open.spotify.com/album/0hvT3yIEysuuvkK73vgdcW"}, "href": "https://api.spotify.com/v1/albums/0hvT3yIEysuuvkK73vgdcW", "id": "0hvT3yIEysuuvkK73vgdcW", "images": [{"url": "https://i.scdn.co/image/ab67616d0000b273d9985092cd88bffd97653b58", "width": 640, "height": 640}, {"url": "https://i.scdn.co/image/ab67616d00001e02d9985092cd88bffd97653b58", "width": 300, "height": 300}, {"url": "https://i.scdn.co/image/ab67616d00004851d9985092cd88bffd97653b58", "width": 64, "height": 64}], "name": "GNX", "release_date": "2024-11-22", "release_date_precision": "day", "total_tracks": 12, "type": "album", "uri": "spotify:album:0hvT3yIEysuuvkK73vgdcW"}, "artists": [{"external_urls": {"spotify": "https://open.spotify.com/artist/2YZyLoL8N0Wb9xBt1NhZWg"}, "href": "https://api.spotify.com/v1/artists/2YZyLoL8N0Wb9xBt1NhZWg", "id": "2YZyLoL8N0Wb9xBt1NhZWg", "name": "Kendrick Lamar", "type": "artist", "uri": "spotify:artist:2YZyLoL8N0Wb9xBt1NhZWg"}], "available_markets": ["AR", "AU", "AT", "BE", "BO", "BR", "BG", "CA", "CL", "CO", "CR", "CY", "CZ", "DK", "DO", "DE", "EC", "EE", "SV", "FI", "FR", "GR", "GT", "HN", "HK", "HU", "IS", "IE", "IT", "LV", "LT", "LU", "MY", "MT", "MX", "NL", "NZ", "NI", "NO", "PA", "PY", "PE", "PH", "PL", "PT", "SG", "SK", "ES", "SE", "CH", "TW", "TR", "UY", "US", "GB", "AD", "LI", "MC", "ID", "JP", "TH", "VN", "RO", "IL", "ZA", "SA", "AE", "BH", "QA", "OM", "KW", "EG", "MA", "DZ", "TN", "LB", "JO", "PS", "IN", "KZ", "MD", "UA", "AL", "BA", "HR", "ME", "MK", "RS", "SI", "KR", "BD", "PK", "LK", "GH", "KE", "NG", "TZ", "UG", "AG", "AM", "BS", "BB", "BZ", "BT", "BW", "BF", "CV", "CW", "DM", "FJ", "GM", "GE", "GD", "GW", "GY", "HT", "JM", "KI", "LS", "LR", "MW", "MV", "ML", "MH", "FM", "NA", "NR", "NE", "PW", "PG", "WS", "SM", "ST", "SN", "SC", "SL", "SB", "KN", "LC", "VC", "SR", "TL", "TO", "TT", "TV", "VU", "AZ", "BN", "BI", "KH", "CM", "TD", "KM", "GQ", "SZ", "GA", "GN", "KG", "LA", "MO", "MR", "MN", "NP", "RW", "TG", "UZ", "ZW", "BJ", "MG", "MU", "MZ", "AO", "CI", "DJ", "ZM", "CD", "CG", "IQ", "LY", "TJ", "VE", "ET", "XK"], "disc_number": 1, "duration_ms": 317092, "explicit": true, "external_ids": {"isrc": "USUG12408495"}, "external_urls": {"spotify": "https://open.spotify.com/track/5gOfC9UzZQzTyShqPMrpjT"}, "href": "https://api.spotify.com/v1/tracks/5gOfC9UzZQzTyShqPMrpjT", "id": "5gOfC9UzZQzTyShqPMrpjT", "is_local": false, "name": "wacced out murals", "popularity": 88, "preview_url": null, "track_number": 1, "type": "track", "uri": "spotify:track:5gOfC9UzZQzTyShqPMrpjT", "danceability": 0.761, "energy": 0.501, "key": 9, "loudness": -10.759, "mode": 0, "speechiness": 0.459, "acousticness": 0.249, "instrumentalness": 0.0, "liveness": 0.136, "valence": 0.502, "tempo": 81.998, "time_signature": 4}];
const configtest = {
    songColors: ['#FF6633', '#FFB399', '#FF33FF', '#FFFF99', '#00B3E6', '#E6B333', '#3366E6', '#999966', '#99FF99', '#B34D4D', '#80B300', '#809900', '#E6B3B3', '#6680B3', '#66991A', '#FF99E6', '#CCFF1A', '#FF1A66', '#E6331A', '#33FFCC', '#66994D', '#B366CC', '#4D8000', '#B33300', '#CC80CC', '#66664D', '#991AFF', '#E666FF', '#4DB3FF', '#1AB399', '#E666B3', '#33991A', '#CC9999', '#B3B31A', '#00E680', '#4D8066', '#809980', '#E6FF80', '#1AFF33', '#999933', '#FF3380', '#CCCC00', '#66E64D', '#4D80CC', '#9900B3', '#E64D66', '#4DB380', '#FF4D4D', '#99E6E6', '#6666FF'],
    maxSelectedSongs: 10
}
console.log("Length of the testdataset", testdata.length);
// inputs is the variable where to test the different legths of the dataset

let inputs = 7;
let data = testdata.slice(0, inputs);
console.log("number of songs to present in the table:", data.length)
/// --- prepDataTable takes the raw data and prepares in an array; 
// the index of each element in tempRow is used in the objects of "attributes" as "arrayIndex" 
function prepDataTable(data, configtest ){
    let Rows = [];
    let tempRow = [];
    for (let i = 0; i < data.length; i++) {
        tempRow = [data[i].id, 
                    data[i].name,
                    data[i].artists.map(artist => artist.name).join(', '),
                    data[i].danceability,
                    data[i].energy,
                    data[i].acousticness,
                    data[i].speechiness,
                    data[i].liveness,
                    data[i].tempo,
                    data[i].valence,
                    data[i].loudness,
                    configtest.songColors[i]];
        Rows.push(tempRow);
        console.log(Rows[i]);        
    }
    return Rows;
}

// croping the song title to fit in the element
function cropText(textElement, text, widthElement) {
    // Append a temporary text element to the SVG to measure its length
    const tempText = textElement.append("text")
        .attr("visibility", "hidden")
        .text(text);

    let croppedText = text;
    if (tempText.node().getComputedTextLength() < widthElement-2){
        croppedText = text
    }
    else{
        while (tempText.node().getComputedTextLength() > widthElement-5) {
            croppedText = croppedText.slice(0, -4); // Remove one character at a time
            tempText.text(croppedText + "...");
        }
        croppedText = croppedText + "..."
    }
    // Remove the temporary element after measuring
    tempText.remove();

    return croppedText;
}

function makeScrolingSongTitle(tableData, i){
    let textElement = svgTable.append("g")
                .attr("clip-path", "url(#clip-border" + i + ")")
                .append("text")
                .attr("id", "song" + i + "inTableScroll")
                .attr("class", "scroll-container scroll-content")
                .attr("x", 5)
                .attr("y", heightElement + heightElement * i + heightElement / 4)
                .attr("dominant-baseline", "central")
                .on("mouseover", function(){
                    d3.select("#song" + i + "inTable").style("visibility", "hidden");
                });

            textElement.append("tspan")
                .attr("class", "card-title")
                .attr("dy", "0")
                .text(tableData[i][1])
                .style("pointer-events", "none");

            textElement.append("tspan")
                .attr("class", "card-text")
                .attr("x", 5)
                .attr("dy", "1.2em")
                .text(tableData[i][2])
                .style("pointer-events", "none");
            
            // scrolling effect
            textElement.append("animateTransform")
                .attr("attributeName", "transform")
                .attr("type", "translate")
                .attr("from", widthSong)   // Starting position (right)
                .attr("to", "-100")    // Ending position (left)
                .attr("dur", "5s")   
                .attr("repeatCount", "indefinite"); // Infinite scrolling
}


let tableData =  prepDataTable(data, configtest);



// Definition of the luminance scales which are then stored in "attributes" as "scale"
let colorScaleDanceability = d3.scaleLinear()
.domain([d3.min(data, function(d) {
    return d.danceability}), 
    d3.max(data, function(d) {
        return d.danceability})])
.range([0, 1]);
let colorScaleEnergy = d3.scaleLinear()
.domain([d3.min(data, function(d) {
    return d.energy}), 
    d3.max(data, function(d) {
        return d.energy})])
.range([0, 1]);
let colorScaleAcousticness = d3.scaleLinear()
.domain([d3.min(data, function(d) {
    return d.acousticness}), 
    d3.max(data, function(d) {
        return d.acousticness})])
.range([0, 1]);
let colorScaleSpeechiness = d3.scaleLinear()
.domain([d3.min(data, function(d) {
    return d.speechiness}), 
    d3.max(data, function(d) {
        return d.speechiness})])
.range([0, 1]);
let colorScaleLiveness = d3.scaleLinear()
.domain([d3.min(data, function(d) {
    return d.liveness}), 
    d3.max(data, function(d) {
        return d.liveness})])
.range([0, 1]);
let colorScaleTempo = d3.scaleLinear()
.domain([d3.min(data, function(d) {
    return d.tempo}), 
    d3.max(data, function(d) {
        return d.tempo})])
.range([0, 1]);
let colorScaleValence = d3.scaleLinear()
.domain([d3.min(data, function(d) {
    return d.valence}), 
    d3.max(data, function(d) {
        return d.valence})])
.range([0, 1]);
let colorScaleLoudness = d3.scaleLinear()
.domain([d3.min(data, function(d) {
    return d.loudness}), 
    d3.max(data, function(d) {
        return d.loudness})])
.range([0, 1]);

const attributes = [{id: "danceability", attribute: "Danceability", scale: colorScaleDanceability, arrayIndex: 3, description: "Danceability describes how suitable a track is for dancing based on a combination of musical elements including tempo, rhythm stability, beat strength, and overall regularity. A value of 0.0 is least danceable and 1.0 is most danceable."},
     {id: "energy", attribute: "Energy", scale: colorScaleEnergy, arrayIndex: 4, description: "Energy is a measure from 0.0 to 1.0 and represents a perceptual measure of intensity and activity. Typically, energetic tracks feel fast, loud, and noisy. For example, death metal has high energy, while a Bach prelude scores low on the scale. Perceptual features contributing to this attribute include dynamic range, perceived loudness, timbre, onset rate, and general entropy."},
     {id:"acousticness", attribute: "Acousticness", scale: colorScaleAcousticness, arrayIndex: 5, description: "A confidence measure from 0.0 to 1.0 of whether the track is acoustic. 1.0 represents high confidence the track is acoustic."},
     {id: "speechiness", attribute: "Speechiness", scale: colorScaleSpeechiness, arrayIndex: 6, description: "Speechiness detects the presence of spoken words in a track. The more exclusively speech-like the recording (e.g. talk show, audio book, poetry), the closer to 1.0 the attribute value. Values above 0.66 describe tracks that are probably made entirely of spoken words. Values between 0.33 and 0.66 describe tracks that may contain both music and speech, either in sections or layered, including such cases as rap music. Values below 0.33 most likely represent music and other non-speech-like tracks."},
     {id: "liveness", attribute: "Liveness", scale: colorScaleLiveness, arrayIndex: 7, description: "Detects the presence of an audience in the recording. Higher liveness values represent an increased probability that the track was performed live. A value above 0.8 provides strong likelihood that the track is live."},
     {id: "tempo", attribute: "Tempo", scale: colorScaleTempo, arrayIndex: 8, description: "The overall estimated tempo of a track in beats per minute (BPM). In musical terminology, tempo is the speed or pace of a given piece and derives directly from the average beat duration."},
     {id: "valence", attribute: "Valence", scale: colorScaleValence, arrayIndex: 9,description: "A measure from 0.0 to 1.0 describing the musical positiveness conveyed by a track. Tracks with high valence sound more positive (e.g. happy, cheerful, euphoric), while tracks with low valence sound more negative (e.g. sad, depressed, angry)."},
     {id: "loudness", attribute: "Loudness", scale: colorScaleLoudness, arrayIndex: 10, description: "The overall loudness of a track in decibels (dB). Loudness values are averaged across the entire track and are useful for comparing relative loudness of tracks. Loudness is the quality of a sound that is the primary psychological correlate of physical strength (amplitude). Values typically range between -60 and 0 db."}]


// Margin object with properties for the four directions
const margin = {top: 5,
             right: 5, 
             bottom: 5, 
             left: 5};

// Width and height as the inner dimensions of the chart area
const width = 720 - margin.left - margin.right;
let height = 450 - margin.top - margin.bottom;

const widthSong = 150
const heightElement = height/11 

let svgTable = d3.select("#attrributeTable").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
// appending the headline of the Table
svgTable.append("rect")
    .attr("x", 0)
    .attr("y", 0)
    .attr("width", widthSong)
    .attr("height", heightElement)
    .attr("fill", "none")
    .attr("stroke-width", 2)
    .attr("stroke", "black")
svgTable.append("text")
    .style("text-anchor", "middle")
    .text("Song")
	.attr("class", "tableHeadline")
    .attr("id", "songnameHeadline")
	.attr("x", widthSong/2)
	.attr("y", heightElement/2)
    .attr("dominant-baseline", "central");

for (let i = 0; i < attributes.length; i++) {
    svgTable.append("rect")// headline elements for attributes
        .attr("id", attributes[i].id + "Headline")    
        .attr("x", widthSong + ((width - widthSong)/attributes.length) * i )
        .attr("y", 0)
        .attr("width", ((width - widthSong)/attributes.length))
        .attr("height", heightElement)
        .attr("fill", "none")
        .attr("stroke-width", 2)
        .attr("stroke", "black");
    svgTable.append("text")
        .style("text-anchor", "middle")
        .text(attributes[i].attribute)
        .attr("class", "tableHeadline")
        .attr("x", widthSong + ((width - widthSong)/attributes.length) * i + ((width - widthSong)/attributes.length)/2)
        .attr("y", heightElement/2)
        .attr("dominant-baseline", "central");
    };

// making the table grid and append the values to the table
 
for (let i = 0 ; i < tableData.length; i++){
    
    svgTable.append("rect")// adding box for higlighting a row when on hover
        .attr("id", "Row" + i + "highlight")
        .attr("x", 0)
        .attr("y", heightElement + (heightElement * i))
        .attr("width", width)
        .attr("height", heightElement)
        .attr("fill", "none");
    
    svgTable.append("clipPath")// for the scrolling text while hoveriong over one specific song
        .attr("id", "clip-border" + i)
        .append("rect")
        .attr("x", 5)
        .attr("y", heightElement + heightElement * i)
        .attr("width", widthSong - 10)
        .attr("height", heightElement); 

    svgTable.append("rect") // addig the box for the song title
        .attr("class", "songInTable Row" + i)
        .attr("x", 0)
        .attr("y", heightElement + heightElement *i)
        .attr("width", widthSong)
        .attr("height", heightElement)
        .attr("fill-opacity", 0)
        .attr("stroke-width", 2)
        .attr("stroke", "black")
        .on("mouseover", function() {
            d3.select("#Row" + i + "highlight" ).attr("stroke", tableData[i][11]).attr("stroke-width", 4).style("visibility", "visible");// change for row outline highlight
            d3.select("#song" + i + "inTable").style("visibility", "hidden"); // hides the cropped static song titles
            makeScrolingSongTitle(tableData, i); //places the scrolling song title
        })
        .on("mouseout", function() {
            d3.select("#Row" + i + "highlight").style("visibility", "hidden"); // removes row higlighting
            d3.select("#song" + i + "inTable").style("visibility", "visible");// shows the cropt static text
            d3.select("#song" + i + "inTableScroll").remove();// removes the scrolling text
        });

     svgTable.append("text")// append static title to first collunm
        .attr("id", "song" + i + "inTable")
        .attr("x", 5)
	    .attr("y", heightElement + heightElement *i + heightElement/4)
        .attr("dominant-baseline", "central")
        .html(`<tspan class="card-title" dy="0">${cropText(svgTable, tableData[i][1], widthSong)}</tspan><br><tspan class="card-text" x="5" dy="1.2em">${cropText(svgTable, tableData[i][2], widthSong)}</tspan>`)
        .on("mouseover", function() {
            d3.select("#Row" + i + "highlight" ).attr("stroke", tableData[i][11]).attr("stroke-width", 4).style("visibility", "visible");// change for row outline highlight
            d3.select("#song" + i + "inTable").style("visibility", "hidden"); // hides the cropped static song titles
            makeScrolingSongTitle(tableData, i); //places the scrolling song title
        })
        .on("mouseout", function() {
            d3.select("#Row" + i + "highlight").style("visibility", "hidden"); // removes row higlighting
            d3.select("#song" + i + "inTable").style("visibility", "visible");// shows the cropt static text
            d3.select("#song" + i + "inTableScroll").remove();// removes the scrolling text
        });
    
    

    for (let j = 0; j < attributes.length; j++){
        svgTable.append("rect")
            .attr("class", attributes[j].id + " Row" +i)    
            .attr("x", widthSong + ((width - widthSong)/attributes.length) * j )
            .attr("y", heightElement + heightElement *i)
            .attr("width", ((width - widthSong)/attributes.length))
            .attr("height", heightElement)
            .attr("fill", "black")
            .attr("stroke-width", 2)
            .attr("fill-opacity", attributes[j].scale(tableData[i][attributes[j].arrayIndex]))
            .attr("stroke", "none")
            .on("mouseover", function() {
                d3.select("#Row" + i + "highlight" ).attr("stroke", tableData[i][11]).attr("stroke-width", 4).style("visibility", "visible");// change for row outline highlight
            })
            .on("mouseout", function() {
                d3.select("#Row" + i + "highlight").style("visibility", "hidden"); // removes row higlighting
            });
        }
}
