import type { ActivityEvent } from "../types";

function Strong({ children }: { children: string }) {
  return <span className="font-medium text-fg">{children}</span>;
}

/** One sentence per activity type. Adding a type to ACTIVITY_TYPES makes this switch fail to compile until handled. */
export function ActivityDescription({ event }: { event: ActivityEvent }) {
  const actor = <Strong>{event.actor.name}</Strong>;
  const target = <Strong>{event.target}</Strong>;
  const detail = event.detail ? <Strong>{event.detail}</Strong> : null;

  switch (event.type) {
    case "member.joined":
      return <>{actor} joined the organization</>;
    case "member.invited":
      return detail ? (
        <>
          {actor} invited {target} as {detail}
        </>
      ) : (
        <>
          {actor} invited {target}
        </>
      );
    case "member.removed":
      return (
        <>
          {actor} removed {target}
        </>
      );
    case "member.suspended":
      return (
        <>
          {actor} suspended {target}
        </>
      );
    case "member.role_changed":
      return (
        <>
          {actor} changed the role of {target}
          {detail && <> to {detail}</>}
        </>
      );
    case "role.created":
      return (
        <>
          {actor} created the role {target}
        </>
      );
    case "role.updated":
      return (
        <>
          {actor} updated permissions for {target}
        </>
      );
    case "organization.updated":
      return (
        <>
          {actor} updated {event.target}
        </>
      );
    case "application.enabled":
      return (
        <>
          {actor} enabled {target}
        </>
      );
    default: {
      const unhandled: never = event.type;
      return <>{unhandled}</>;
    }
  }
}
