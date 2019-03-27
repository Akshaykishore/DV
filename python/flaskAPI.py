from flask import Flask, jsonify, request
# from bson.json_util import dumps
from flask_cors import CORS
import pandas as pd
import json
from pandas.io.json import json_normalize
import xlrd


app = Flask(__name__)
CORS(app)

@app.route('/sendFilePath', methods=['POST'])
def sendFilePath():
    try:
        data = request.json
        data = data["path"].split('fakepath\\')
        path = '/Users/kshykm/Desktop/aravindDV/angular/src/assets/' + data[1]
        train = pd.read_excel(path)
        print(train)
        r = train.shape[0]
        df = train.drop(train.loc[:, train.isnull().sum() > r / 2], axis=1)
        return jsonify({'input': train.to_json(orient='split'),'output1':df.to_json(orient='split')})

    except Exception as e:
        print(str(e))


@app.route('/step2', methods=['POST'])
def step2():
    try:
        data = request.json
        df = pd.DataFrame.from_dict(json_normalize(data), orient='columns')
        r = df.shape[1]
        s = df.dropna(axis=0, how=None, thresh=r / 2, subset=None, inplace=False)
        return jsonify({"output2":s.to_json(orient='columns')})


    except Exception as e:
        print(str(e))


@app.route('/step3', methods=['POST'])
def step3():
    try:
        data = (request.json)["name"]
        path = '/Users/kshykm/Desktop/files/'+ data
        train = pd.read_excel(path)
        print(train)
        # data = request.json
        # df = pd.DataFrame.from_dict(json_normalize(data), orient='columns')
        # print(df)
        k = train._get_numeric_data()
        print(k)
        return jsonify({"output3":k.to_json(orient='split')})


    except Exception as e:
        print(str(e))


def rem_out( L, z_score_thr ):

	L_mean= 0
	for i in range( len(L) ):
		L_mean= L_mean + (L[i]/len(L))

	L_var= 0
	for i in range( len(L) ):
		L_var= L_var + (( L[i] - L_mean )**2) / len(L)

	for i in range( len(L) ):
		if (L[i] - L_mean)**2 > ( z_score_thr**2 )*L_var:
			L[i]= L_mean + random.randrange( 0, m.floor( z_score_thr*(L_var**0.5) ), 1 )
	return L

@app.route('/step4', methods=['POST'])
def step4():
    data = (request.json)["name"]
    path = '/Users/kshykm/Desktop/files/'+ data
    T = pd.read_excel(path)
    print(t)
    col_no = 2
    threshold = 1
    R= []
    for i in range( len(T.columns) ):
        R.append( T[ T.columns.tolist()[ i ] ].tolist() )
    print( rem_out( R[col_no], threshold ) )
    R[col_no]= rem_out( R[col_no], threshold )
    r= list(map(list, zip(*R)))
    df= pd.DataFrame(r)
    writer = ExcelWriter( xl_filename + '-outliers-removed.xlsx')
    df.to_excel(writer,'Sheet1',index=False)
    writer.save()

# out_rem_rep( "C:\\Users\\Sairam\\Desktop\\t4", 2, 1 )

if __name__ == '__main__':
    app.run(debug=True, port=9080)