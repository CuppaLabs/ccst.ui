module.exports = {
    database: {
        'connection': {
            'user': 'admin',
            'password': 'Oracle00',
            'connectString': '137.254.163.161:1521/ORCCST.oracle.com'
        }
    },
    authorization: {
        'secretKey': 'mysecretsecret',
        'secretKeyExpiresIn': 60*60*24
    },
    mailer: {
        'service': 'Gmail',
        'user': 'welpnext20@gmail.com',
        'clientId': '634526477192-24nk18gfulcbdmse6tj3t3h19ucoaub9.apps.googleusercontent.com',
        'clientSecret': 'OMVDS_PvVwC2qAUMjwREFMrC',
        'refreshToken': '1/fjRD6ZPhK1eRhe66IeLcyYBMTTdddHAZDuZMgDb5-kZP2GyBURDOLTHDle_ZUhgm'
    }
};