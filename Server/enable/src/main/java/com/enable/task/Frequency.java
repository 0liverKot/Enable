package com.enable.task;

import java.util.Optional;

public class Frequency{

    private FrequencyOptions frequencyOption;
    private String custom; 

    public enum FrequencyOptions{DAILY, EVERY_OTHER_DAY, WEEKLY, BI_WEEKLY, CUSTOM};
    
    public Frequency(FrequencyOptions frequencyOption, Optional<String> custom) {
        if(frequencyOption != FrequencyOptions.CUSTOM) {
            this.frequencyOption = frequencyOption;
        } else {
            this.frequencyOption = frequencyOption;
            this.custom = custom.get();
        }         
    }

    public FrequencyOptions getFrequencyOption() {
        return this.frequencyOption;
    }

    public void setFrequencyOption(FrequencyOptions frequencyOption) {
        this.frequencyOption = frequencyOption;
    }

    public String getFrequency() {
        String frequency = switch (this.frequencyOption) {
            case DAILY -> "1";
            case EVERY_OTHER_DAY -> "2";
            case WEEKLY -> "7";
            case BI_WEEKLY -> "14";
            case CUSTOM -> this.custom;
        };

        return frequency;
    }

}
