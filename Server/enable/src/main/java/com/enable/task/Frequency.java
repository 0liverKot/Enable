package com.enable.task;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import jakarta.persistence.Embeddable;

@Embeddable
public class Frequency{

    private String frequencyOption;
    private String custom;

    public Frequency() {}

    public Frequency(String frequencyOption, String custom) {
    
        // check for valid frequencyOption
        List<String> validFrequencyOptions = new ArrayList<>(Arrays.asList("DAILY", "EVERY_OTHER_DAY", "WEEKLY", "BI_WEEKLY"));

        if(!validFrequencyOptions.contains(frequencyOption)) {
            throw new IllegalStateException("Invalid Frequency Option selected");
        }

        if(custom != "N/A") {
            this.custom = custom;
            this.frequencyOption = frequencyOption;
        } else {
            this.frequencyOption = frequencyOption;
            };
        }
        

    public String getFrequencyOption() {
        return this.frequencyOption;
    }

    public void setFrequencyOption(String frequencyOption) {
        this.frequencyOption = frequencyOption;
    }

    public String getFrequencyDays() {
        String frequency = switch (this.frequencyOption) {
            case "DAILY" -> "1";
            case "EVERY_OTHER_DAY" -> "2";
            case "WEEKLY" -> "7";
            case "BI_WEEKLY" -> "14";
            case "CUSTOM" -> this.custom;
            default -> null;
        };

        return frequency;
    }

}
