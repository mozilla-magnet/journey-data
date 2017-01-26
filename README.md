# Journey Storage Client

High level API for accessing stored data, either in the client, or from another
source of data.

It's centered around issuing commands to get or initiate actions, a storage
driver then interprets the commands into a result.

# Quick Start

```js
import { JourneyData } from 'journey-data';
import MockStorage from 'journey-data/src/storage/mock-storage';

const journeyData = new JourneyData(new MockStorage());

// get list of newest stories and like the latest one
const stories = journeyData.getNewestStories();
journeyData.likeStory(stories[0]);
```

Available API methods.

```js
journeyData.getClosestPopularStories({ currentLocation, radius })
journeyData.getClosestStories({ currentLocation, radius })
journeyData.getNewestStories()
journeyData.likeStory({ id })
journeyData.deleteLikeStory({ id })
journeyData.visitStory({ id })
journeyData.deleteVisitStory({ id })
journeyData.getStory({ id });
journeyData.getUser({ id });
```

TODO: Use `RealmStorage`, migrations

# License

MPL-2.0
