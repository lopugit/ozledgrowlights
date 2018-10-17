// import something here
import flamelink from 'flamelink'
import firebase from 'firebase'

const config = {
	apiKey: "AIzaSyATXH6vwwHRsd3amszUgFW3DEplHr7dIgQ",
	authDomain: "alopu-cms.firebaseapp.com",
	databaseURL: "https://alopu-cms.firebaseio.com",
	projectId: "alopu-cms",
	storageBucket: "alopu-cms.appspot.com",
	messagingSenderId: "278663639558"
}
// leave the export, even if you don't use it
export default ({ app, router, Vue }) => {
	var firebaseApp
	if(!firebase.apps.length){
		firebaseApp = firebase.initializeApp(config)
	} else {
		firebaseApp = firebase.app()
	}
	Vue.prototype.$fl = flamelink({firebaseApp})
}
