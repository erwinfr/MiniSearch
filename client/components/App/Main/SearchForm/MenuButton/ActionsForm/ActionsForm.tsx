import { Text, Button, VStack, Message, useToaster } from "rsuite";
import { useState } from "react";
import { LogsModal } from "./LogsModal/LogsModal";

export function ActionsForm() {
  const [isLogsModalOpen, setLogsModalOpen] = useState(false);

  const toaster = useToaster();

  const handleClearDataButtonClick = async () => {
    const sureToDelete = self.confirm(
      "Are you sure you want to reset the settings and delete all files in cache?",
    );

    if (!sureToDelete) return;

    toaster.push(
      <Message showIcon type="info" id="clear-data-toast" closable>
        Clearing data...
      </Message>,
    );

    self.localStorage.clear();

    for (const cacheName of await self.caches.keys()) {
      await self.caches.delete(cacheName);
    }

    for (const databaseInfo of await self.indexedDB.databases()) {
      if (databaseInfo.name) self.indexedDB.deleteDatabase(databaseInfo.name);
    }

    toaster.push(
      <Message
        showIcon
        type="success"
        id="clear-data-toast"
        closable
        onClose={() => self.location.reload()}
      >
        Data cleared!
      </Message>,
    );
  };

  const isLogsButtonVisible = self.location.hash.includes("#logs");

  return (
    <VStack spacing={16}>
      <VStack>
        <Button size="sm" onClick={handleClearDataButtonClick}>
          Clear all data
        </Button>
        <Text size="sm" muted>
          Reset settings and delete all files in cache to free up space.
        </Text>
      </VStack>
      {isLogsButtonVisible && (
        <VStack>
          <Button size="sm" onClick={() => setLogsModalOpen(true)}>
            Show logs
          </Button>
          <Text size="sm" muted>
            View application logs for troubleshooting and monitoring app
            activity.
          </Text>
          <LogsModal
            open={isLogsModalOpen}
            onClose={() => setLogsModalOpen(false)}
          />
        </VStack>
      )}
    </VStack>
  );
}
