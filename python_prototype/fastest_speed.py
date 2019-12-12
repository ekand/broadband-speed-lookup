import requests


def lookup_speed(address_input):
    address = address_input
    coordinates = get_coordinates(address)
    blockcode = get_blockcode(coordinates)
    fastest = get_fastest(blockcode)
    return fastest


def get_coordinates(address):
    public_key = "pk.eyJ1IjoiZXJpa2thbmRlcnNvbiIsImEiOiJjazMxdnNqcmMwZGgz" \
                 "M2JzNXF5ZnM3MHhlIn0.RhbHx-zoZopJ_Xwx9iDbog"
    request_string = f"https://api.mapbox.com/geocoding/v5/" \
                     f"mapbox.places/{address}.json?access_token={public_key}"
    r = requests.get(request_string)
    r_content = r.json()
    pass
    lat = r_content['features'][0]['center'][0]
    long = r_content['features'][0]['center'][1]
    coordinates = (lat, long)
    return coordinates


def get_blockcode(coordinates):
    lat = coordinates[0]
    long = coordinates[1]
    request_string = f"https://geo.fcc.gov/api/census/block/find?longitude={lat}" \
                     f"&latitude={long}&format=json&showall=false"
    r = requests.get(request_string)
    r_content = r.json()
    blockcode = r_content['Block']['FIPS']
    return blockcode


def get_fastest(blockcode):
    request_string = f"https://opendata.fcc.gov/resource/" \
                     f"ehbi-rr4z.json?blockcode={blockcode}&consumer=1"
    r = requests.get(request_string)
    r_content = r.json()
    fastest = 0
    for row in r_content:
        x = float(row['maxaddown'])
        if x > fastest:
            fastest = x
    return fastest


print(lookup_speed(60601))
