import { ActionIcon, Avatar, Card, Group, Text, rem } from '@mantine/core';
import { IconCopy, IconEdit, IconTrash } from '@tabler/icons-react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import CurrentAttachments from '../CurrentAttachments';
import classes from './ArticleCardVertical.module.css';

const serverHost = import.meta.env.VITE_REACT_APP_SERVER_HOST;

type Props = {
    text: string;
    to: string;
    post_id: number;
};

function ArticleCardVertical(props: Props) {
    const { text, to, post_id } = props;
    const [attachments, setAttachments] = useState([]);

    useEffect(() => {
        const getAttachments = async () => {
            const response = await fetch(`${serverHost}/api/posts/photos/${post_id}`);
            const data = await response.json();
            if (data.code == 404) {
                setAttachments([]);
            } else {
                setAttachments(data);
            }
        };
        getAttachments();
    }, []);

    return (
        <Card withBorder radius="md" p={0} className={classes.card}>
            <Group wrap="nowrap" gap={0}>
                <CurrentAttachments attachments={attachments} setAttachments={setAttachments} />
                <div className={classes.body}>
                    <Group wrap="nowrap" gap="xs" justify="flex-end">
                        <Text tt="uppercase" c="dimmed" fw={700} size="xs">
                            technology
                        </Text>
                        <ActionIcon size={30}>
                            <Link to={to}>
                                <IconEdit style={{ width: rem(20), height: rem(20) }} />
                            </Link>
                        </ActionIcon>
                        <ActionIcon>
                            <IconCopy style={{ width: rem(20), height: rem(20) }} />
                        </ActionIcon>
                        <ActionIcon>
                            <IconTrash style={{ width: rem(20), height: rem(20) }} />
                        </ActionIcon>
                    </Group>
                    <Text className={classes.title} mt="xs" mb="md" dangerouslySetInnerHTML={{ __html: text }}></Text>
                    <Group wrap="nowrap" gap="xs">
                        <Group gap="xs" wrap="nowrap">
                            <Avatar
                                size={20}
                                src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-8.png"
                            />
                            <Text size="xs">Elsa Typechecker</Text>
                        </Group>
                        <Text size="xs" c="dimmed">
                            •
                        </Text>
                        <Text size="xs" c="dimmed">
                            Feb 6th
                        </Text>
                    </Group>
                </div>
            </Group>
        </Card>
    );
}

export default ArticleCardVertical;