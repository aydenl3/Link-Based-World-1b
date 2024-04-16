class Start extends Scene {
    create() {
        this.engine.setTitle(this.engine.storyData.Title); // TODO: replace this text using this.engine.storyData to find the story title
        this.engine.addChoice("Begin the story");
    }

    handleChoice() {
        this.engine.gotoScene(Location, this.engine.storyData.InitialLocation); // TODO: replace this text by the initial location of the story
    }
}

class Location extends Scene {
    create(key) {
        let locationData = this.engine.storyData.Locations[key]; // TODO: use `key` to get the data object for the current story location
        this.engine.show(locationData.Body); // TODO: replace this text by the Body of the location data
        
        if(locationData.Choices) { // TODO: check if the location has any Choices
            for(let choice of locationData.Choices) { // TODO: loop over the location's Choices
                if(choice.Breakable){
                    if(choice.Perm){
                        if(hasKey == true && choice.Broken == false){
                            this.engine.addChoice(choice.Text, choice);   
                        }
                    }
                    else if (choice.Broken == false){
                        this.engine.addChoice(choice.Text, choice);
                    }
                }
                else if(choice.Perm) {
                        if(hasKey == true){
                            this.engine.addChoice(choice.Text, choice);   
                        }
                    } else {
                        this.engine.addChoice(choice.Text, choice); // TODO: use the Text of the choice
                        // TODO: add a useful second argument to addChoice so that the current code of handleChoice below works
                    }

            }
        } else {
            this.engine.addChoice("The end.")
        }
    }

    handleChoice(choice) {
        if(choice) {
            this.engine.show("&gt; "+choice.Text);//Code that adds the "">South"
            if(choice.Grant){
                hasKey = true;
            }
            if(choice.Interact){
                this.interactScene(choice);
            }
            else{            
            this.engine.gotoScene(Location, choice.Target);
            }
        } else {
            this.engine.gotoScene(End);
        }
    }

    interactScene(choice){
        this.engine.show(choice.Interact);
        if(choice.Break){
            choice.Broken = true;
        }
        if(choice.Grant){
            hasKey = true;
        }
        if(choice.Speak){
            choice.Speak++;
            if(choice.Speak > 3){
                this.engine.show(choice.Leave)
                choice.Broken = true;
            }
        }
        this.engine.gotoScene(Location, choice.Target);
    }
}

class End extends Scene {
    create() {
        this.engine.show("<hr>");
        this.engine.show(this.engine.storyData.Credits);
    }
}
let hasKey = false;
Engine.load(Start, 'myStory.json');