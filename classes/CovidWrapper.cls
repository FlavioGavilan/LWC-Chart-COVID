public with sharing class CovidWrapper {
    @auraEnabled
        public Integer uid;
        @auraEnabled
        public String uf;
        @auraEnabled
        public String state;
        @auraEnabled
        public Integer cases;
        @auraEnabled
        public Integer deaths;
        @auraEnabled
        public Integer suspects;
        @auraEnabled
        public Integer refuses;
        @auraEnabled
        public boolean broadcast;
        @auraEnabled
        public String comments;
        @auraEnabled
        public String datetimeReturn;

        public CovidWrapper(Integer uid, String uf, String state, Integer cases, Integer deaths,
            Integer suspects, Integer refuses, boolean broadcast, String comments, String datetimeReturn){
                this.uid        = uid;
                this.uf         = uf;
                this.state      = state;
                this.cases      = cases;
                this.deaths     = deaths;
                this.suspects   = suspects;
                this.refuses    = suspects;
                this.broadcast  = broadcast;
                this.comments   = comments;
                this.datetimeReturn   = datetimeReturn;
        }

        public CovidWrapper(String uf, Integer cases, Integer deaths, Integer suspects, Integer refuses){
            this.uf         = uf;
            this.cases      = cases;
            this.deaths     = deaths;
            this.suspects   = suspects;
            this.refuses    = refuses;
        }

        public CovidWrapper(){
            
        }
}
