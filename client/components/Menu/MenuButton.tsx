import { useState } from "react";
import { AISettingsForm } from "./AISettingsForm";
import { ActionsForm } from "./ActionsForm";
import {
  Button,
  Drawer,
  Accordion,
  ActionIcon,
  HoverCard,
  Stack,
  Group,
  Center,
  FocusTrap,
} from "@mantine/core";
import { IconBrandGithub } from "@tabler/icons-react";
import { repository } from "../../../package.json";
import prettyMilliseconds from "pretty-ms";
import { getSemanticVersion } from "../../modules/stringFormatters";
import { addLogEntry } from "../../modules/logEntries";
import { InterfaceSettingsForm } from "./InterfaceSettingsForm";

export default function MenuButton() {
  const [isDrawerOpen, setDrawerOpen] = useState(false);

  const openDrawer = () => {
    setDrawerOpen(true);
    addLogEntry("User opened the menu");
  };

  const closeDrawer = () => {
    setDrawerOpen(false);
    addLogEntry("User closed the menu");
  };

  const repoName = repository.url.split("/").pop();

  return (
    <>
      <Button size="xs" onClick={openDrawer} variant="default">
        Menu
      </Button>
      <Drawer
        opened={isDrawerOpen}
        position="right"
        onClose={closeDrawer}
        size="md"
        title={
          <Group gap="xs">
            <ActionIcon
              variant="subtle"
              component="a"
              color="var(--mantine-color-text)"
              href={repository.url}
              target="_blank"
              onClick={() => addLogEntry("User clicked the GitHub link")}
            >
              <IconBrandGithub size={16} />
            </ActionIcon>
            <HoverCard shadow="md" withArrow>
              <HoverCard.Target>
                <Center>{repoName}</Center>
              </HoverCard.Target>
              <HoverCard.Dropdown>
                <Stack gap="xs">
                  <Center>{repoName}</Center>
                  <Center>
                    {`v${getSemanticVersion(VITE_BUILD_DATE_TIME)}+${VITE_COMMIT_SHORT_HASH}`}
                  </Center>
                  <Center>
                    Released{" "}
                    {prettyMilliseconds(
                      new Date().getTime() -
                        new Date(VITE_BUILD_DATE_TIME).getTime(),
                      {
                        compact: true,
                        verbose: true,
                      },
                    )}{" "}
                    ago
                  </Center>
                </Stack>
              </HoverCard.Dropdown>
            </HoverCard>
          </Group>
        }
      >
        <FocusTrap.InitialFocus />
        <Drawer.Body>
          <Accordion variant="separated" multiple>
            <Accordion.Item value="aiSettings">
              <Accordion.Control>AI Settings</Accordion.Control>
              <Accordion.Panel>
                <AISettingsForm />
              </Accordion.Panel>
            </Accordion.Item>
            <Accordion.Item value="interfaceSettings">
              <Accordion.Control>Interface Settings</Accordion.Control>
              <Accordion.Panel>
                <InterfaceSettingsForm />
              </Accordion.Panel>
            </Accordion.Item>
            <Accordion.Item value="actions">
              <Accordion.Control>Actions</Accordion.Control>
              <Accordion.Panel>
                <ActionsForm />
              </Accordion.Panel>
            </Accordion.Item>
          </Accordion>
        </Drawer.Body>
      </Drawer>
    </>
  );
}
