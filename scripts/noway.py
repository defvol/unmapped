# Generates file of tilepaths with no highway on OSM

all = open('./data/z16.all').read().split('\n') # 851401
hig = open('./data/z16.txt').read().split('\n') # 22472
diff = set(all) - set(hig) # 829163 of 851401
for tile in diff:
    print(tile)
