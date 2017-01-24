# Journey Storage Client

High level API for accessing stored data, either in the client, or from another
source of data.

It's centered around issuing commands to get or initiate actions, a storage
driver then interprets the commands into a result.

# Quick Start

```
import { Storage, JourneyData } from 'journey-data';

const storage = new Storage.MockStorage();

const journeyData = new JourneyData(storage);

// get list of newest stories and like the latest one
const stories = journeyData.getNewestStories();
journeyData.likeStory(stories[0]);
```

Available API methods.

```
journeyData.getClosestPopularStories({ currentLocation, radius })
journeyData.getClosestStories({ currentLocation, radius })
journeyData.getNewestStories()
journeyData.likeStory({ story: { id } })
journeyData.deleteLikeStory({ story: { id } })
journeyData.visitStory({ story: { id } })
journeyData.deleteVisitStory({ story: { id } })
journeyData.getStory({ story: { id }});
```

TODO: Use `RealmStorage`, migrations

# License

MPL-2.0
