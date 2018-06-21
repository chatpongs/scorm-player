function SCORMapi1_2() {
    var cmi;
    function initdatamodel(scoid) {
        cmi = new Object();
        cmi.core = new Object(); 
        cmi.core.score = new Object(); 
        cmi.objectives = new Object(); 
        cmi.student_data = new Object(); 
        cmi.student_preference = new Object(); 
        cmi.interactions = new Object(); 
        cmi.evaluation = new Object(); 
        cmi.evaluation.comments = new Object(); 
        nav = new Object(); 
        
        cmi.core.lesson_status = 'not attempted';
    }

    function LMSInitialize(param) {
        initdatamodel(undefined); 
        return "true";
    }

    function LMSFinish(param) {
        return "true";
    }

    function LMSGetValue(element) {
        var value = eval(element);
        return value ? value : '';
    }

    function LMSSetValue(element, value) {
        eval(element + "=" + "'" + value + "'");
        return "true";
    }

    function LMSCommit(param) {
        return "true";
    }

    function LMSGetLastError() {
        return "";
    }

    function LMSGetErrorString(param) {
        return "";
    }

    function LMSGetDiagnostic(param) {
        return "";
    }

    this.LMSInitialize = LMSInitialize; 
    this.LMSFinish = LMSFinish; 
    this.LMSGetValue = LMSGetValue; 
    this.LMSSetValue = LMSSetValue; 
    this.LMSCommit = LMSCommit; 
    this.LMSGetLastError = LMSGetLastError; 
    this.LMSGetErrorString = LMSGetErrorString; 
    this.LMSGetDiagnostic = LMSGetDiagnostic
}

window.API = new SCORMapi1_2();