# Journey Storage Client

High level API for accessing stored data, either in the client, or from another
source of data.

It's centered around issuing commands to get or initiate actions, a storage
driver then interprets the commands into a result.

# Quick Start

```
import { Storage, Journey } from 'journey-data';

const storage = new Storage.MockStorage();

const journey = new Journey(storage);

// get list of newest stories and like the latest one
const stories = journey.getNewestStories();
journey.likeStory(stories[0]);

```

Available API methods.

```
journey.getClosestPopularStories({ currentLocation, radius })
journey.getClosestStories({ currentLocation, radius })
journey.getNewestStories()
journey.likeStory({ story: { id } })
journey.deleteLikeStory({ story: { id } })
journey.visitStory({ story: { id } })
journey.deleteVisitStory({ story: { id } })
```

TODO: Use `RealmStorage`, migrations

# License

MPL-2.0
