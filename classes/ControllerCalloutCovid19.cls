public with sharing class ControllerCalloutCovid19 {
    @AuraEnabled(cacheable=true)      
    public static List<CovidWrapper> getValoresCovid(){
        
        List<String> lListHour = new List<String>{
            '20211015', '20210915', '20210815',
            '20210715', '20210615', '20210515',
            '20210415', '20210315', '20210215',
            '20210115', '20201215', '20201115',
            '20201015', '20200915', '20200815'                      
        };        
        
        List<CovidWrapper> lListCovidWrapper = new List<CovidWrapper>();

        for(String h : lListHour){
            HttpResponse response = ServiceCalloutCovid19.calloutCovid(h);
            
            Map<String, Object> results = (Map<String, Object>) JSON.deserializeUntyped(response.getBody());
            List<Object> lListObject = (List<Object>) results.get('data');
            
            lListCovidWrapper = returnListCovidValues(lListObject);
        } 
        
        return lListCovidWrapper;
    } 
    
    public static List<CovidWrapper> returnListCovidValues(List<Object> lListObject){
        Map<String, Object> lMap = new Map<String, Object>();
        List<CovidWrapper> lList = new List<CovidWrapper>();

        for(Object o : lListObject){
            CovidWrapper lCovid = new CovidWrapper();
            lMap = (Map<String, Object>) o;

            lCovid.uid 				    = (Integer) lMap.get('uid');
            lCovid.uf 			        = (String) lMap.get('uf');
            lCovid.state 			    = (String) lMap.get('state');
            lCovid.cases 			    = (Integer) lMap.get('cases');
            lCovid.deaths 			    = (Integer) lMap.get('deaths');
            lCovid.suspects 		    = (Integer) lMap.get('suspects');
            lCovid.refuses 			    = (Integer) lMap.get('refuses');
            lCovid.broadcast 		    = (Boolean) lMap.get('broadcast');            
            lCovid.comments 		    = (String) lMap.get('comments');
            lCovid.datetimeReturn 	    = (String) lMap.get('datetime');
            
            lList.add(lCovid);
        }                
        
        return lList;
    }
}
