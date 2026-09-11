
# =============================================================================

#

# COREI INSTITUTIONAL DOCUMENT AND KNOWLEDGE ASSET REGISTRY

#

# DOCUMENT ID

#

# COREI-RF-09.02

#

# DOCUMENT NAME

#

# INSTITUTIONAL DOCUMENT AND KNOWLEDGE ASSET REGISTRY

#

# REPOSITORY FILE

#

# knowledge/09-reference/COREI-RF-09.02-INSTITUTIONAL-DOCUMENT-AND-KNOWLEDGE-ASSET-REGISTRY.md

#

# VERSION

#

# 1.0

#

# STATUS

#

# APPROVED

#

# CLASSIFICATION

#

# CONSTITUTIONAL

#

# =============================================================================

# =============================================================================

#

# 1. PURPOSE

#

# =============================================================================

The COREI Institutional Document and Knowledge Asset
Registry defines the authoritative institutional
framework for identifying,
classifying,
registering,
discovering,
linking,
versioning,
governing,
superseding,
retiring,
and preserving

documents

and

knowledge assets

across the COREI institutional system.

Its purpose is to ensure that institutional
knowledge does not become

anonymous,

duplicated,

untraceable,

unowned,

contradictory,

or dependent upon conversation memory.

Every material institutional knowledge asset SHALL
have sufficient identity and metadata to determine

what it is,

where it belongs,

who owns it,

what authority it carries,

what version is current,

what it depends upon,

what supersedes it,

where its authoritative copy exists,

and whether it remains valid for institutional use.

# =============================================================================

#

# 2. SCOPE

#

# =============================================================================

This registry governs

constitutional documents,

identity documents,

governance documents,

architecture documents,

engineering documents,

standards,

specifications,

operations documents,

implementation documents,

reference documents,

history documents,

research documents,

continuity documents,

blueprints,

execution models,

Stage documents,

Phase documents,

Step documents,

Subsystem documents,

Artifact documents,

runbooks,

playbooks,

procedures,

manuals,

guides,

indexes,

registries,

catalogs,

dictionaries,

glossaries,

decision records,

change records,

incident records,

validation records,

certification records,

migration records,

release records,

research notes,

analysis reports,

and future institutional knowledge assets.

# =============================================================================

#

# 3. CORE PRINCIPLE

#

# =============================================================================

Institutional knowledge SHALL be identifiable.

Institutional knowledge SHALL be discoverable.

Institutional knowledge SHALL have ownership.

Institutional knowledge SHALL expose authority.

Institutional knowledge SHALL preserve lifecycle
state.

Institutional knowledge SHALL not depend upon

chat history,

human memory,

or undocumented file names.

# =============================================================================

#

# 4. KNOWLEDGE ASSET DEFINITION

#

# =============================================================================

A Knowledge Asset is any governed artifact whose
primary purpose is to preserve institutional

meaning,

decision,

design,

instruction,

evidence,

reference,

history,

or research.

# =============================================================================

#

# 5. DOCUMENT DEFINITION

#

# =============================================================================

A Document is a structured human-readable or
machine-readable knowledge asset with a defined
institutional purpose.

# =============================================================================

#

# 6. DOCUMENT IDENTITY

#

# =============================================================================

Every material governed document SHALL have a
canonical document identity.

The document identity SHALL remain distinct from

file name,

repository path,

display title,

storage location,

or conversation attachment name.

# =============================================================================

#

# 7. ASSET IDENTITY

#

# =============================================================================

Every material knowledge asset SHOULD have a stable
asset identity where it must be

referenced,

versioned,

superseded,

audited,

or preserved.

# =============================================================================

#

# 8. DOCUMENT ID

#

# =============================================================================

The canonical COREI document ID SHALL follow the
approved institutional identifier model.

Example

COREI-RF-09.02.

# =============================================================================

#

# 9. ASSET ID

#

# =============================================================================

The `asset_id` metadata field SHALL contain the
canonical institutional identity of the knowledge
asset.

For a governed document,
the asset ID SHOULD equal the document ID unless a
different approved asset model applies.

# =============================================================================

#

# 10. DOCUMENT TITLE

#

# =============================================================================

Every document SHALL have a clear institutional
title.

The title SHALL describe the document's purpose or
subject.

The title SHALL not be treated as canonical
identity.

# =============================================================================

#

# 11. DOMAIN

#

# =============================================================================

Every governed knowledge document SHALL belong to an
approved knowledge domain.

The domain SHALL define the primary institutional
responsibility of the document.

# =============================================================================

#

# 12. DOMAIN CODE

#

# =============================================================================

Every governed knowledge document SHALL use the
approved domain code defined by the institutional
identifier registry.

# =============================================================================

#

# 13. DOCUMENT NUMBER

#

# =============================================================================

Every governed knowledge document SHALL have a
document number unique within its approved domain
structure.

# =============================================================================

#

# 14. CLASSIFICATION

#

# =============================================================================

Document classification SHALL identify the
institutional significance and control level of the
document.

Classification MAY include

Constitutional,

Governance,

Architectural,

Engineering,

Standard,

Specification,

Operational,

Implementation,

Reference,

Historical,

Research,

or other approved classes.

Classification SHALL not be invented casually.

# =============================================================================

#

# 15. AUTHORITY

#

# =============================================================================

Every material governed document SHALL expose its
authority state.

Authority MAY include

Authoritative,

Normative,

Advisory,

Informational,

Historical,

Experimental,

or other approved authority classes.

A document SHALL not be treated as authoritative
merely because it exists.

# =============================================================================

#

# 16. VERSION

#

# =============================================================================

Every material governed document SHALL expose a
version.

Versioning SHALL allow the institution to determine
which document state is being referenced.

# =============================================================================

#

# 17. STATUS

#

# =============================================================================

Every governed knowledge asset SHALL expose a
lifecycle status.

Status MAY include

Draft,

Proposed,

Under Review,

Approved,

Active,

Deprecated,

Superseded,

Retired,

Archived,

Historical,

Rejected,

or other approved states.

# =============================================================================

#

# 18. OWNER

#

# =============================================================================

Every material knowledge asset SHALL have an
accountable owner.

The owner is responsible for

accuracy,

maintenance,

review,

change,

and retirement

within the authority model.

# =============================================================================

#

# 19. REPOSITORY

#

# =============================================================================

Every governed repository-backed document SHOULD
identify its authoritative repository location.

Repository metadata SHALL not replace canonical
document identity.

# =============================================================================

#

# 20. DEPENDENCY

#

# =============================================================================

A document MAY depend upon other institutional
documents or knowledge assets.

Dependencies SHALL identify prerequisite authority
or context required for correct interpretation.

# =============================================================================

#

# 21. SUPERSESSION

#

# =============================================================================

Supersession SHALL identify when one knowledge asset
replaces another as the active institutional source.

# =============================================================================

#

# 22. SUPERSEDES

#

# =============================================================================

The `supersedes` field SHALL identify previous
assets replaced by the current asset where
applicable.

# =============================================================================

#

# 23. SUPERSEDED BY

#

# =============================================================================

The `superseded_by` field SHALL identify the
replacement asset where applicable.

# =============================================================================

#

# 24. DOCUMENT METADATA

#

# =============================================================================

The minimum metadata model for a governed COREI
knowledge document SHOULD include

asset_id,

title,

domain,

domain_code,

document_number,

classification,

authority,

version,

status,

owner,

repository,

depends_on,

supersedes,

superseded_by.

Additional metadata MAY be defined where required.

# =============================================================================

#

# 25. METADATA IS PART OF THE CONTRACT

#

# =============================================================================

Document metadata SHALL be treated as governed
institutional information.

Metadata SHALL not be considered decorative.

# =============================================================================

#

# 26. METADATA CONSISTENCY

#

# =============================================================================

Metadata values SHALL remain consistent with the
document body and registry state.

A document SHALL not declare

Approved

in metadata while the authoritative registry records
it as

Draft

without explicit reconciliation.

# =============================================================================

#

# 27. DOCUMENT FILE NAME

#

# =============================================================================

The canonical file naming convention SHOULD follow

COREI-<DOMAIN_CODE>-<DOCUMENT_NUMBER>-<DOCUMENT-NAME>.md

where applicable.

# =============================================================================

#

# 28. FILE NAME NORMALIZATION

#

# =============================================================================

Canonical file names SHOULD use

uppercase institutional identity,

stable domain code,

stable document number,

descriptive hyphen-separated title,

and approved file extension.

# =============================================================================

#

# 29. FILE NAME IS NOT IDENTITY

#

# =============================================================================

Renaming a file SHALL not automatically create a new
knowledge asset.

Changing the institutional meaning of an asset MAY
require a new identity.

# =============================================================================

#

# 30. REPOSITORY PATH

#

# =============================================================================

The repository path identifies the current
authoritative storage location.

A path change SHALL be treated as a location change
unless institutional identity also changes.

# =============================================================================

#

# 31. KNOWLEDGE ROOT

#

# =============================================================================

The canonical knowledge root is

knowledge/

unless superseded by approved repository
architecture.

# =============================================================================

#

# 32. KNOWLEDGE DOMAIN DIRECTORY REGISTRY

#

# =============================================================================

The authoritative knowledge domain directory model
is

knowledge/00-knowledge-system/

knowledge/01-identity/

knowledge/02-governance/

knowledge/03-architecture/

knowledge/04-engineering/

knowledge/05-standards/

knowledge/06-specifications/

knowledge/07-operations/

knowledge/08-implementation/

knowledge/09-reference/

knowledge/10-history/

knowledge/11-research/.

These directories SHALL preserve their institutional
domain meaning.

# =============================================================================

#

# 33. KNOWLEDGE SYSTEM DOMAIN

#

# =============================================================================

`knowledge/00-knowledge-system/`

contains the constitutional structure governing the
COREI Knowledge System itself.

# =============================================================================

#

# 34. IDENTITY DOMAIN

#

# =============================================================================

`knowledge/01-identity/`

contains institutional identity,
purpose,
principles,
and defining constitutional knowledge.

# =============================================================================

#

# 35. GOVERNANCE DOMAIN

#

# =============================================================================

`knowledge/02-governance/`

contains institutional authority,
ownership,
decision rights,
change control,
and governance knowledge.

# =============================================================================

#

# 36. ARCHITECTURE DOMAIN

#

# =============================================================================

`knowledge/03-architecture/`

contains approved structural,
boundary,
dependency,
ownership,
and execution architecture.

# =============================================================================

#

# 37. ENGINEERING DOMAIN

#

# =============================================================================

`knowledge/04-engineering/`

contains institutional engineering methods,
principles,
practices,
and implementation disciplines.

# =============================================================================

#

# 38. STANDARDS DOMAIN

#

# =============================================================================

`knowledge/05-standards/`

contains mandatory institutional technical and
operational standards.

# =============================================================================

#

# 39. SPECIFICATIONS DOMAIN

#

# =============================================================================

`knowledge/06-specifications/`

contains exact contracts,
interfaces,
schemas,
formats,
and implementation specifications.

# =============================================================================

#

# 40. OPERATIONS DOMAIN

#

# =============================================================================

`knowledge/07-operations/`

contains operational procedures,
runbooks,
response models,
maintenance,
and runtime management knowledge.

# =============================================================================

#

# 41. IMPLEMENTATION DOMAIN

#

# =============================================================================

`knowledge/08-implementation/`

contains implementation plans,
execution records,
migration details,
validation results,
and realized-system knowledge.

# =============================================================================

#

# 42. REFERENCE DOMAIN

#

# =============================================================================

`knowledge/09-reference/`

contains indexes,
registries,
catalogs,
maps,
dictionaries,
and controlled institutional reference material.

# =============================================================================

#

# 43. HISTORY DOMAIN

#

# =============================================================================

`knowledge/10-history/`

contains preserved historical states,
decisions,
changes,
incidents,
migrations,
and institutional evolution.

# =============================================================================

#

# 44. RESEARCH DOMAIN

#

# =============================================================================

`knowledge/11-research/`

contains exploratory,
experimental,
analytical,
and pre-approval knowledge.

# =============================================================================

#

# 45. DOCUMENT TYPE REGISTRY

#

# =============================================================================

COREI knowledge assets MAY include the following
controlled document types.

Constitution

Policy

Principle

Model

Blueprint

Architecture

Standard

Specification

Procedure

Runbook

Playbook

Guide

Manual

Plan

Roadmap

Index

Registry

Catalog

Dictionary

Glossary

Matrix

Map

Record

Report

Analysis

Research

Continuity Document

Decision Record

Change Record

Incident Record

Validation Record

Certification Record

Migration Record

Release Record.

Additional document types MAY be introduced through
controlled governance.

# =============================================================================

#

# 46. CONSTITUTIONAL DOCUMENT

#

# =============================================================================

A Constitutional Document defines foundational
institutional law,
identity,
or system-wide authority.

Constitutional documents SHALL have the highest
applicable knowledge authority unless superseded by
a higher explicitly defined constitutional source.

# =============================================================================

#

# 47. GOVERNANCE DOCUMENT

#

# =============================================================================

A Governance Document defines authority,
ownership,
decision rights,
control,
or institutional process.

# =============================================================================

#

# 48. ARCHITECTURE DOCUMENT

#

# =============================================================================

An Architecture Document defines approved system

structure,

boundaries,

ownership,

dependencies,

or execution relationships.

# =============================================================================

#

# 49. ENGINEERING DOCUMENT

#

# =============================================================================

An Engineering Document defines how institutional
engineering is performed.

# =============================================================================

#

# 50. STANDARD

#

# =============================================================================

A Standard defines mandatory requirements that
implementations SHALL satisfy.

# =============================================================================

#

# 51. SPECIFICATION

#

# =============================================================================

A Specification defines exact technical or
operational contracts.

# =============================================================================

#

# 52. OPERATIONS DOCUMENT

#

# =============================================================================

An Operations Document defines how approved systems
are operated,
monitored,
maintained,
recovered,
or controlled.

# =============================================================================

#

# 53. IMPLEMENTATION DOCUMENT

#

# =============================================================================

An Implementation Document records how approved
architecture and specifications are realized.

# =============================================================================

#

# 54. REFERENCE DOCUMENT

#

# =============================================================================

A Reference Document provides governed lookup,
mapping,
indexing,
or discovery information.

# =============================================================================

#

# 55. HISTORY DOCUMENT

#

# =============================================================================

A History Document preserves prior institutional
state or events.

Historical documents SHALL not automatically govern
current implementation.

# =============================================================================

#

# 56. RESEARCH DOCUMENT

#

# =============================================================================

A Research Document preserves exploration,
analysis,
experimentation,
or proposed knowledge.

Research SHALL not silently become institutional
authority.

# =============================================================================

#

# 57. CONTINUITY DOCUMENT

#

# =============================================================================

A Continuity Document preserves sufficient current
state for safe transfer or restoration of work.

Continuity documents SHALL identify their baseline
and freshness.

# =============================================================================

#

# 58. BLUEPRINT

#

# =============================================================================

A Blueprint defines an approved high-level system
design or implementation direction.

Blueprint authority SHALL be interpreted within the
source hierarchy.

# =============================================================================

#

# 59. EXECUTION MODEL

#

# =============================================================================

An Execution Model defines how institutional work
progresses through controlled stages or lifecycle
states.

# =============================================================================

#

# 60. INDEX

#

# =============================================================================

An Index provides structured navigation to knowledge
assets.

An index SHALL not silently replace the authority of
the assets it references.

# =============================================================================

#

# 61. REGISTRY

#

# =============================================================================

A Registry maintains controlled institutional
objects and metadata.

A registry MAY itself be authoritative.

# =============================================================================

#

# 62. CATALOG

#

# =============================================================================

A Catalog exposes discoverable information about a
set of assets.

A catalog MAY aggregate multiple authoritative
sources.

# =============================================================================

#

# 63. RECORD

#

# =============================================================================

A Record preserves evidence of an institutional
event,
decision,
change,
validation,
or state.

# =============================================================================

#

# 64. KNOWLEDGE ASSET AUTHORITY HIERARCHY

#

# =============================================================================

Where knowledge assets conflict,
the approved institutional authority hierarchy
SHALL determine precedence.

The hierarchy SHALL consider

constitutional authority,

governance authority,

approved architecture,

mandatory standards,

approved specifications,

authoritative operational state,

repository implementation truth,

and validated runtime state

according to the subject being resolved.

No universal document-only hierarchy SHALL override
actual authoritative runtime or repository truth
where those are the designated source of truth.

# =============================================================================

#

# 65. DOCUMENT SOURCE OF TRUTH

#

# =============================================================================

Every material knowledge asset SHALL have one
authoritative maintained copy.

Replicas MAY exist.

The authoritative copy SHALL remain identifiable.

# =============================================================================

#

# 66. DOCUMENT REPLICA

#

# =============================================================================

A Document Replica is a copied representation of an
authoritative document.

A replica SHALL not silently become an independent
authority.

# =============================================================================

#

# 67. EXPORTED DOCUMENT

#

# =============================================================================

An exported PDF,
HTML,
text,
or other representation

SHALL be treated as a representation of a specific
document version unless explicitly designated as an
independent asset.

# =============================================================================

#

# 68. CONVERSATION COPY

#

# =============================================================================

A document pasted into conversation is a transient
representation.

Conversation presence SHALL not determine
institutional authority.

# =============================================================================

#

# 69. ATTACHMENT COPY

#

# =============================================================================

An uploaded attachment MAY be authoritative only
when its identity,
version,
and source authority

are established.

File upload time alone SHALL not determine
freshness.

# =============================================================================

#

# 70. DUPLICATE DOCUMENT

#

# =============================================================================

Duplicate files SHALL be evaluated by

document identity,

version,

content,

authority,

and repository source.

File-name equality alone SHALL not prove identity.

# =============================================================================

#

# 71. DOCUMENT COLLISION

#

# =============================================================================

A Document Collision occurs when

the same document ID refers to different
institutional meanings

or

different active documents claim the same canonical
identity.

Collisions SHALL be resolved before further
authoritative use.

# =============================================================================

#

# 72. DOCUMENT CONFLICT

#

# =============================================================================

A Document Conflict occurs when multiple knowledge
assets make incompatible claims about the same
institutional subject.

Conflict resolution SHALL identify

the subject,

the conflicting claims,

the authority of each source,

the applicable baseline,

and the canonical resolution.

# =============================================================================

#

# 73. DOCUMENT DRIFT

#

# =============================================================================

Document Drift occurs when a knowledge asset no
longer reflects the authoritative state it is
intended to describe.

Drift SHALL be corrected,
deprecated,
or explicitly marked.

# =============================================================================

#

# 74. STALE DOCUMENT

#

# =============================================================================

A stale document is not necessarily historically
invalid.

It SHALL not be used as current authority when its
baseline no longer matches the current system.

# =============================================================================

#

# 75. DOCUMENT FRESHNESS

#

# =============================================================================

Documents describing changing system state SHOULD
expose sufficient freshness information.

Freshness MAY include

version,

effective date,

baseline,

repository commit,

release,

Stage,

Phase,

or generation time.

# =============================================================================

#

# 76. DOCUMENT BASELINE

#

# =============================================================================

A Document Baseline identifies the system state to
which the document applies.

A baseline MAY reference

repository commit,

release,

Stage,

Phase,

deployment,

environment,

or other controlled state.

# =============================================================================

#

# 77. DOCUMENT VERSIONING

#

# =============================================================================

Document versioning SHALL distinguish materially
different governed states.

Version changes SHALL be controlled.

# =============================================================================

#

# 78. MAJOR VERSION

#

# =============================================================================

A major version change SHOULD represent a materially
incompatible or structurally significant change
where the adopted version model requires it.

# =============================================================================

#

# 79. MINOR VERSION

#

# =============================================================================

A minor version change SHOULD represent a compatible
material extension or revision where the adopted
version model requires it.

# =============================================================================

#

# 80. CORRECTION

#

# =============================================================================

Minor corrections MAY be applied according to
governance without changing institutional identity.

Material meaning changes SHALL not be hidden as
editorial corrections.

# =============================================================================

#

# 81. DOCUMENT APPROVAL

#

# =============================================================================

Approval SHALL establish that the document has
passed the required authority process.

Approval SHALL not prove that implementation exists.

# =============================================================================

#

# 82. DOCUMENT ACTIVATION

#

# =============================================================================

An approved document MAY become active immediately
or at a defined effective state.

Approval and activation MAY be distinct.

# =============================================================================

#

# 83. DOCUMENT DEPRECATION

#

# =============================================================================

A deprecated document remains discoverable but is
no longer preferred for new institutional use.

# =============================================================================

#

# 84. DOCUMENT SUPERSESSION

#

# =============================================================================

A superseded document has been replaced by another
approved asset for the applicable scope.

# =============================================================================

#

# 85. DOCUMENT RETIREMENT

#

# =============================================================================

A retired document is no longer active.

Historical traceability SHALL be preserved where
required.

# =============================================================================

#

# 86. DOCUMENT ARCHIVAL

#

# =============================================================================

Archived documents SHALL remain retrievable
according to retention requirements.

# =============================================================================

#

# 87. DOCUMENT DELETION

#

# =============================================================================

Deletion of governed institutional knowledge SHALL
follow retention,
security,
legal,
and governance requirements.

Deletion SHALL not destroy required institutional
history.

# =============================================================================

#

# 88. DOCUMENT DEPENDENCY GRAPH

#

# =============================================================================

Material document dependencies SHOULD be
discoverable as a graph.

The graph MAY support

impact analysis,

change planning,

continuity restoration,

and AI context resolution.

# =============================================================================

#

# 89. DOCUMENT PARENT RELATIONSHIP

#

# =============================================================================

A document MAY have a structural parent.

Parent relationships SHALL not automatically imply
authority unless explicitly defined.

# =============================================================================

#

# 90. DOCUMENT CHILD RELATIONSHIP

#

# =============================================================================

A child document MAY extend,
specialize,
or implement

a parent document.

A child SHALL not weaken higher authority
requirements.

# =============================================================================

#

# 91. DOCUMENT RELATED-TO RELATIONSHIP

#

# =============================================================================

A related-to relationship indicates contextual
relevance without dependency or authority.

# =============================================================================

#

# 92. DOCUMENT IMPLEMENTS RELATIONSHIP

#

# =============================================================================

An implementation document MAY identify the
architecture,
standard,
or specification

that it implements.

# =============================================================================

#

# 93. DOCUMENT VALIDATES RELATIONSHIP

#

# =============================================================================

A validation record MAY identify the artifact or
baseline it validates.

# =============================================================================

#

# 94. DOCUMENT CERTIFIES RELATIONSHIP

#

# =============================================================================

A certification record SHALL identify the exact
baseline it certifies.

# =============================================================================

#

# 95. DOCUMENT SUPERSEDES RELATIONSHIP

#

# =============================================================================

Supersession SHALL be directional and explicit.

# =============================================================================

#

# 96. DOCUMENT REFERENCES RELATIONSHIP

#

# =============================================================================

A reference relationship indicates that one asset
uses another for context or lookup.

Reference alone SHALL not imply dependency.

# =============================================================================

#

# 97. DOCUMENT REGISTRATION

#

# =============================================================================

Every material governed knowledge asset SHALL be
registered through the approved institutional
process.

# =============================================================================

#

# 98. REGISTRATION RECORD

#

# =============================================================================

A registration record SHOULD contain

asset ID,

title,

type,

domain,

classification,

authority,

version,

status,

owner,

repository path,

dependencies,

supersession state,

and baseline

where applicable.

# =============================================================================

#

# 99. DOCUMENT DISCOVERY

#

# =============================================================================

Knowledge assets SHOULD be discoverable by

asset ID,

title,

domain,

type,

classification,

authority,

status,

owner,

Stage,

Phase,

repository path,

dependency,

and supersession state.

# =============================================================================

#

# 100. DOCUMENT SEARCH

#

# =============================================================================

Search SHALL not rely solely upon file names.

Metadata and content MAY be indexed.

# =============================================================================

#

# 101. DOCUMENT NAVIGATION

#

# =============================================================================

A user or authorized system SHOULD be able to move
from

knowledge domain

to

document

to

dependencies

to

implementation

to

validation

where applicable.

# =============================================================================

#

# 102. DOCUMENT INDEXING

#

# =============================================================================

Indexes SHOULD expose the current authoritative
asset identity and status.

Indexes SHALL not hide supersession.

# =============================================================================

#

# 103. DOCUMENT REGISTRY STATUS

#

# =============================================================================

The registry SHALL distinguish

registered,

active,

deprecated,

superseded,

retired,

archived,

and unresolved

assets.

# =============================================================================

#

# 104. UNREGISTERED DOCUMENT

#

# =============================================================================

An unregistered document MAY exist as working
material.

It SHALL not automatically be treated as
institutional authority.

# =============================================================================

#

# 105. ORPHAN DOCUMENT

#

# =============================================================================

An Orphan Document is a material knowledge asset
without sufficient ownership,
domain placement,
or institutional relationship.

Orphan documents SHALL be classified,
registered,
or retired.

# =============================================================================

#

# 106. UNOWNED DOCUMENT

#

# =============================================================================

A material authoritative document SHALL not remain
without an accountable owner.

# =============================================================================

#

# 107. UNKNOWN DOCUMENT STATUS

#

# =============================================================================

Unknown status SHALL remain explicit.

Systems SHALL not assume that an unknown document is
approved or active.

# =============================================================================

#

# 108. DOCUMENT VALIDATION

#

# =============================================================================

Document validation MAY verify

identity,

metadata,

file naming,

repository location,

dependency resolution,

supersession integrity,

internal consistency,

and required structure.

# =============================================================================

#

# 109. METADATA VALIDATION

#

# =============================================================================

Metadata validation SHALL verify that required
fields

exist,

use approved values,

and do not conflict with registry state.

# =============================================================================

#

# 110. LINK VALIDATION

#

# =============================================================================

Document links and dependency references SHOULD be
validated for resolvability.

# =============================================================================

#

# 111. SUPERSESSION VALIDATION

#

# =============================================================================

Supersession relationships SHALL be validated to
prevent

cycles,

multiple conflicting active replacements,

or unresolved replacement state.

# =============================================================================

#

# 112. DOCUMENT INTEGRITY

#

# =============================================================================

Document integrity SHALL preserve

identity,

content,

metadata,

version,

and authority

against uncontrolled modification.

# =============================================================================

#

# 113. DOCUMENT CHANGE CONTROL

#

# =============================================================================

Material changes SHALL follow the authority model
applicable to the document class.

# =============================================================================

#

# 114. DOCUMENT REVIEW

#

# =============================================================================

Documents MAY require periodic,
event-driven,
or change-triggered review.

Review frequency SHALL match the rate at which the
subject can become stale.

# =============================================================================

#

# 115. DOCUMENT REVIEW TRIGGER

#

# =============================================================================

Review MAY be triggered by

architecture change,

implementation change,

Stage completion,

Phase completion,

incident,

migration,

release,

dependency change,

authority change,

or detected drift.

# =============================================================================

#

# 116. DOCUMENT CHANGE IMPACT

#

# =============================================================================

Before changing a material authoritative document,
dependent assets SHOULD be identified.

# =============================================================================

#

# 117. DOCUMENT MIGRATION

#

# =============================================================================

Moving documents between

repositories,

directories,

formats,

or knowledge systems

SHALL preserve canonical identity and history where
required.

# =============================================================================

#

# 118. DOCUMENT FORMAT MIGRATION

#

# =============================================================================

Format migration SHALL preserve

meaning,

identity,

metadata,

and authority.

# =============================================================================

#

# 119. DOCUMENT REPOSITORY MIGRATION

#

# =============================================================================

Repository migration SHALL preserve discoverability
and authoritative-source resolution.

# =============================================================================

#

# 120. DOCUMENT RENAMING

#

# =============================================================================

Document renaming SHALL preserve canonical asset
identity unless the institutional object itself has
changed.

# =============================================================================

#

# 121. DOCUMENT SPLIT

#

# =============================================================================

When one document becomes multiple independently
governed assets,
new identities SHOULD be assigned.

The original asset SHALL have explicit disposition.

# =============================================================================

#

# 122. DOCUMENT MERGE

#

# =============================================================================

When multiple documents become one authoritative
asset,
the predecessor identities SHALL remain traceable.

# =============================================================================

#

# 123. KNOWLEDGE ASSET LINEAGE

#

# =============================================================================

Material knowledge assets SHOULD preserve lineage
across

creation,

revision,

split,

merge,

migration,

supersession,

and retirement.

# =============================================================================

#

# 124. DOCUMENT HISTORY

#

# =============================================================================

Document history SHALL preserve enough information
to understand significant institutional evolution.

# =============================================================================

#

# 125. CURRENT STATE VS HISTORY

#

# =============================================================================

Current authoritative documents SHALL remain
distinguishable from historical records.

# =============================================================================

#

# 126. HISTORY SHALL NOT OVERRIDE CURRENT AUTHORITY

#

# =============================================================================

Historical documents SHALL not override current
approved authority merely because they contain more
detail.

# =============================================================================

#

# 127. RESEARCH SHALL NOT OVERRIDE CURRENT AUTHORITY

#

# =============================================================================

Research documents SHALL not override approved
institutional design without explicit adoption.

# =============================================================================

#

# 128. IMPLEMENTATION SHALL NOT BE INVENTED FROM

# DOCUMENTATION

#

# =============================================================================

A document describing intended implementation SHALL
not be treated as proof that the implementation
exists.

Repository and runtime evidence SHALL be verified
where required.

# =============================================================================

#

# 129. DOCUMENTATION SHALL NOT DENY EXISTING

# IMPLEMENTATION

#

# =============================================================================

When validated repository or runtime state proves
that implementation exists,
stale documentation SHALL not override actual
authoritative implementation state.

# =============================================================================

#

# 130. KNOWLEDGE SOURCE HIERARCHY

#

# =============================================================================

When answering an institutional question,
the applicable source of truth SHALL be selected
according to the nature of the question.

Examples:

Institutional identity

→ constitutional identity source.

Authority

→ governance source.

Approved structure

→ architecture source.

Mandatory rule

→ standards source.

Exact contract

→ specification source.

Implemented code

→ repository source.

Current runtime state

→ operational runtime source.

Historical event

→ historical evidence source.

Exploratory proposal

→ research source.

Reference SHALL preserve these distinctions.

# =============================================================================

#

# 131. DOCUMENT CONTEXT PACKAGE

#

# =============================================================================

A context package MAY group multiple knowledge
assets required to understand or execute a defined
scope.

A context package SHALL identify its baseline.

# =============================================================================

#

# 132. MINIMUM CONTEXT PACKAGE

#

# =============================================================================

A material implementation context package MAY
include

identity,

governance,

architecture,

standards,

specifications,

implementation state,

repository state,

validation evidence,

and next approved action

where applicable.

# =============================================================================

#

# 133. CONTINUITY PACKAGE

#

# =============================================================================

A continuity package SHALL contain enough current
institutional knowledge to safely resume work
without redesigning approved architecture.

# =============================================================================

#

# 134. AI KNOWLEDGE ASSET RESPONSIBILITY

#

# =============================================================================

Artificial intelligence systems MAY

search,

index,

summarize,

cross-reference,

classify,

and validate

knowledge assets.

AI SHALL preserve document identity and authority.

# =============================================================================

#

# 135. AI SHALL NOT INVENT DOCUMENT IDENTITY

#

# =============================================================================

Where a canonical document registry exists,
AI SHALL not invent conflicting document IDs.

# =============================================================================

#

# 136. AI SHALL NOT INVENT FILE NAMES

#

# =============================================================================

Where an authoritative file name or path exists,
AI SHALL preserve it exactly.

If unknown,
AI SHALL not falsely claim an exact existing path.

# =============================================================================

#

# 137. AI SHALL CHECK AUTHORITY

#

# =============================================================================

AI SHALL distinguish between

authoritative,

historical,

research,

draft,

and implementation

sources.

# =============================================================================

#

# 138. AI SHALL CHECK FRESHNESS

#

# =============================================================================

AI SHOULD assess whether a knowledge asset remains
current for the question being answered.

# =============================================================================

#

# 139. AI SHALL CHECK SUPERSESSION

#

# =============================================================================

AI SHALL not use a superseded document as current
authority when the replacement is available and
applicable.

# =============================================================================

#

# 140. AI SHALL CHECK REPOSITORY TRUTH

#

# =============================================================================

For implementation questions,
AI SHALL use repository truth where available.

# =============================================================================

#

# 141. AI SHALL CHECK RUNTIME TRUTH

#

# =============================================================================

For current operational state,
AI SHALL use runtime evidence where available.

# =============================================================================

#

# 142. AI SHALL PRESERVE DEPENDENCIES

#

# =============================================================================

AI SHALL not remove material document dependencies
without authority.

# =============================================================================

#

# 143. AI SHALL PRESERVE SUPERSESSION

#

# =============================================================================

AI SHALL preserve explicit supersession
relationships.

# =============================================================================

#

# 144. AI SHALL NOT COLLAPSE DOMAINS

#

# =============================================================================

AI SHALL not place all institutional knowledge into
one undifferentiated document set.

# =============================================================================

#

# 145. AI SHALL NOT TREAT CHAT AS REGISTRY

#

# =============================================================================

Conversation history SHALL not replace the
institutional document registry.

# =============================================================================

#

# 146. AI SHALL NOT TREAT UPLOAD DATE AS DOCUMENT

# DATE

#

# =============================================================================

The time a file was uploaded SHALL not automatically
determine when its content became authoritative.

# =============================================================================

#

# 147. AI SHALL NOT TREAT LONGER DOCUMENT AS HIGHER

# AUTHORITY

#

# =============================================================================

Document length SHALL not determine authority.

# =============================================================================

#

# 148. AI SHALL NOT TREAT NEWER COPY AS HIGHER

# AUTHORITY BY DEFAULT

#

# =============================================================================

File modification time or upload time SHALL not
alone determine institutional precedence.

# =============================================================================

#

# 149. NO DOCUMENT WITHOUT IDENTITY

#

# =============================================================================

Material governed knowledge SHALL not remain
anonymous.

# =============================================================================

#

# 150. NO AUTHORITATIVE DOCUMENT WITHOUT OWNER

#

# =============================================================================

Every authoritative knowledge asset SHALL have an
accountable owner.

# =============================================================================

#

# 151. NO AUTHORITATIVE DOCUMENT WITHOUT STATUS

#

# =============================================================================

Every authoritative knowledge asset SHALL expose its
lifecycle status.

# =============================================================================

#

# 152. NO AUTHORITATIVE DOCUMENT WITHOUT VERSION

#

# =============================================================================

Every materially evolving authoritative knowledge
asset SHALL expose a version.

# =============================================================================

#

# 153. NO SILENT DOCUMENT REPLACEMENT

#

# =============================================================================

Replacing an authoritative document SHALL preserve
supersession history.

# =============================================================================

#

# 154. NO SILENT DOCUMENT DELETION

#

# =============================================================================

Required institutional history SHALL not be removed
without authority.

# =============================================================================

#

# 155. NO DUPLICATE ACTIVE AUTHORITY

#

# =============================================================================

Two incompatible documents SHALL not both remain
active authoritative sources for the same scope
without an explicit authority relationship.

# =============================================================================

#

# 156. NO DOCUMENT ID REUSE

#

# =============================================================================

A retired document ID SHALL not be reassigned to a
different knowledge asset.

# =============================================================================

#

# 157. NO DOMAIN CODE REUSE

#

# =============================================================================

Approved knowledge domain codes SHALL not be
reassigned.

# =============================================================================

#

# 158. NO FILE-PATH-ONLY IDENTITY

#

# =============================================================================

A repository path SHALL not be the sole identity of
a material institutional knowledge asset.

# =============================================================================

#

# 159. NO TITLE-ONLY IDENTITY

#

# =============================================================================

A title SHALL not be the sole identity of a material
governed document.

# =============================================================================

#

# 160. NO UNCONTROLLED COPY AS AUTHORITY

#

# =============================================================================

A copied document SHALL not silently become an
independent authoritative source.

# =============================================================================

#

# 161. NO RESEARCH-AS-PRODUCTION AUTHORITY

#

# =============================================================================

Research SHALL not become production authority
without controlled adoption.

# =============================================================================

#

# 162. NO HISTORY-AS-CURRENT AUTHORITY

#

# =============================================================================

Historical documents SHALL not silently govern
current implementation.

# =============================================================================

#

# 163. NO STALE CONTINUITY DOCUMENT AS CURRENT STATE

#

# =============================================================================

Continuity documents SHALL be interpreted against
their baseline and freshness.

# =============================================================================

#

# 164. NO CHAT-ONLY KNOWLEDGE

#

# =============================================================================

Critical institutional decisions,
architecture,
standards,
specifications,
and implementation state

SHALL be persisted outside conversation history.

# =============================================================================

#

# 165. NO HUMAN-MEMORY-ONLY KNOWLEDGE

#

# =============================================================================

Critical institutional knowledge SHALL be
persisted.

# =============================================================================

#

# 166. DOCUMENT REGISTRATION LIFECYCLE

#

# =============================================================================

The authoritative COREI Document Registration
Lifecycle is

Knowledge Need Identified

↓

Existing Asset Search Performed

↓

Document Boundary Defined

↓

Domain Assigned

↓

Canonical Asset ID Assigned

↓

Title Assigned

↓

Classification Assigned

↓

Authority Assigned

↓

Owner Assigned

↓

Repository Location Assigned

↓

Dependencies Defined

↓

Initial Version Assigned

↓

Status Assigned

↓

Document Created

↓

Metadata Validated

↓

Content Validated

↓

Document Registered

↓

Document Published.

# =============================================================================

#

# 167. DOCUMENT CHANGE LIFECYCLE

#

# =============================================================================

The authoritative COREI Document Change Lifecycle is

Change Need Identified

↓

Current Authoritative Asset Resolved

↓

Authority Confirmed

↓

Dependency Impact Assessed

↓

Change Prepared

↓

Document Updated

↓

Metadata Updated

↓

Validation Performed

↓

Version Updated Where Required

↓

Approval Performed Where Required

↓

Registry Updated

↓

Dependent References Updated

↓

Change Closed.

# =============================================================================

#

# 168. DOCUMENT SUPERSESSION LIFECYCLE

#

# =============================================================================

The authoritative COREI Document Supersession
Lifecycle is

Replacement Need Identified

↓

Current Asset Verified

↓

Replacement Asset Defined

↓

New Identity Assigned Where Required

↓

Authority Confirmed

↓

Dependencies Assessed

↓

Replacement Approved

↓

Old Asset Marked Superseded

↓

`superseded_by` Updated

↓

New Asset `supersedes` Updated

↓

Indexes Updated

↓

Consumers Updated

↓

Historical Resolution Preserved.

# =============================================================================

#

# 169. DOCUMENT RETIREMENT LIFECYCLE

#

# =============================================================================

The authoritative COREI Document Retirement
Lifecycle is

Retirement Need Identified

↓

Current Consumers Identified

↓

Authority Confirmed

↓

Replacement Identified Where Applicable

↓

Status Changed

↓

Indexes Updated

↓

Active Use Removed

↓

Historical Copy Preserved Where Required

↓

Retention Rules Applied

↓

Retirement Closed.

# =============================================================================

#

# 170. DOCUMENT CONFLICT RESOLUTION LIFECYCLE

#

# =============================================================================

The authoritative COREI Document Conflict Resolution
Lifecycle is

Conflict Detected

↓

Conflicting Assets Identified

↓

Canonical Identities Verified

↓

Versions Verified

↓

Statuses Verified

↓

Baselines Verified

↓

Authority Compared

↓

Repository or Runtime Truth Verified Where Required

↓

Canonical Resolution Established

↓

Incorrect Asset Corrected,
Deprecated,
or Superseded

↓

Dependencies Updated

↓

Evidence Preserved

↓

Conflict Closed.

# =============================================================================

#

# 171. KNOWLEDGE RESTORATION LIFECYCLE

#

# =============================================================================

The authoritative COREI Knowledge Restoration
Lifecycle is

Scope Identified

↓

Authoritative Index Located

↓

Relevant Knowledge Domains Identified

↓

Current Documents Resolved

↓

Supersession Checked

↓

Dependencies Loaded

↓

Repository State Verified

↓

Runtime State Verified Where Required

↓

Current Stage,
Phase,
Step,
Subsystem,
and Artifact State Established

↓

Known Gaps Identified

↓

Next Approved Action Established

↓

Work Resumes Without Architectural Reinvention.

# =============================================================================

#

# 172. RELATIONSHIP TO REFERENCE SYSTEM

#

# =============================================================================

COREI-RF-09.00 defines the overall Reference System.

This document defines the governed registry for
documents and knowledge assets within that system.

# =============================================================================

#

# 173. RELATIONSHIP TO IDENTIFIER REGISTRY

#

# =============================================================================

COREI-RF-09.01 defines the identifier,
namespace,
and code model used by document and asset
identities.

# =============================================================================

#

# 174. RELATIONSHIP TO KNOWLEDGE SYSTEM

#

# =============================================================================

The Knowledge System defines the institutional
domain structure in which knowledge assets are
organized.

# =============================================================================

#

# 175. RELATIONSHIP TO IDENTITY

#

# =============================================================================

Identity documents define what COREI is.

The registry makes those documents discoverable
without replacing their authority.

# =============================================================================

#

# 176. RELATIONSHIP TO GOVERNANCE

#

# =============================================================================

Governance defines

ownership,

approval,

change,

and authority

for institutional knowledge.

# =============================================================================

#

# 177. RELATIONSHIP TO ARCHITECTURE

#

# =============================================================================

Architecture documents define approved structural
truth.

The registry preserves their identity and
relationships.

# =============================================================================

#

# 178. RELATIONSHIP TO ENGINEERING

#

# =============================================================================

Engineering documents define implementation
discipline and methods.

# =============================================================================

#

# 179. RELATIONSHIP TO STANDARDS

#

# =============================================================================

Standards define mandatory requirements and SHALL
remain distinguishable from advisory guidance.

# =============================================================================

#

# 180. RELATIONSHIP TO SPECIFICATIONS

#

# =============================================================================

Specifications define exact contracts and SHALL
remain traceable to their implementations.

# =============================================================================

#

# 181. RELATIONSHIP TO OPERATIONS

#

# =============================================================================

Operations documents define runtime procedures and
SHOULD remain aligned with current operational
reality.

# =============================================================================

#

# 182. RELATIONSHIP TO IMPLEMENTATION

#

# =============================================================================

Implementation documents SHALL remain grounded in
actual repository and validated system state.

# =============================================================================

#

# 183. RELATIONSHIP TO HISTORY

#

# =============================================================================

History preserves prior institutional state without
confusing it with current authority.

# =============================================================================

#

# 184. RELATIONSHIP TO RESEARCH

#

# =============================================================================

Research preserves exploration without silently
changing approved institutional truth.

# =============================================================================

#

# 185. MINIMUM DOCUMENT REGISTRATION GATE

#

# =============================================================================

Before a material governed document is registered,
the following SHALL be established where
applicable.

Canonical Asset ID Defined

Title Defined

Domain Defined

Domain Code Valid

Document Number Valid

Classification Defined

Authority Defined

Version Defined

Status Defined

Owner Defined

Repository Location Defined

Dependencies Defined

Supersession State Defined

Metadata Valid

No Document Identity Collision Exists

# =============================================================================

#

# 186. MINIMUM AUTHORITATIVE DOCUMENT GATE

#

# =============================================================================

Before a document is treated as authoritative,
the following SHALL be established where
applicable.

Identity Verified

Authority Explicit

Owner Explicit

Version Explicit

Status Active or Approved as Applicable

Repository Source Known

Dependencies Resolved

Higher Authority Conflicts Resolved

Supersession Checked

Baseline Known Where Required

Content Validated

No Critical Contradiction Remains

# =============================================================================

#

# 187. MINIMUM DOCUMENT CHANGE GATE

#

# =============================================================================

Before a material authoritative document is changed,
the following SHALL be established where
applicable.

Current Asset Resolved

Current Version Known

Change Authority Confirmed

Dependency Impact Assessed

Repository Baseline Known

Change Scope Defined

Validation Defined

Version Impact Determined

Supersession Need Determined

Historical Traceability Preserved

# =============================================================================

#

# 188. MINIMUM DOCUMENT SUPERSESSION GATE

#

# =============================================================================

Before a document is superseded,
the following SHALL be established where
applicable.

Old Asset Identified

Replacement Asset Identified

Authority Confirmed

Scope of Replacement Defined

Dependencies Assessed

Consumers Assessed

Supersession Links Defined

Indexes Updated

Historical Resolution Preserved

No Conflicting Active Authority Remains

# =============================================================================

#

# 189. MINIMUM CONTINUITY KNOWLEDGE GATE

#

# =============================================================================

Before institutional work is resumed from a
continuity package,
the following SHALL be established where
applicable.

Authoritative Knowledge Index Located

Current Documents Resolved

Supersession Checked

Current Architecture Located

Current Implementation State Located

Repository State Verified

Current Stage Identified

Current Phase Identified

Current Step Identified

Current Subsystem Identified

Current Artifact Identified

Known Issues Identified

Next Approved Action Identified

No Critical Context Depends Only Upon Chat Memory

# =============================================================================

#

# 190. DOCUMENT AND KNOWLEDGE ASSET QUESTIONS

#

# =============================================================================

Every material knowledge asset shall answer the
following institutional questions where applicable.

What is this asset?

What is its canonical ID?

What is its title?

What domain owns it?

What type of knowledge asset is it?

What classification does it carry?

What authority does it carry?

What version is current?

What is its lifecycle status?

Who owns it?

Where is its authoritative copy?

What does it depend upon?

What depends upon it?

What does it supersede?

What supersedes it?

What baseline does it describe?

Is it current?

Is it stale?

Is it historical?

Is it research?

Is it implementation-grounded?

Has repository truth been verified where required?

Has runtime truth been verified where required?

Can it be safely used for current institutional
action?

Can a human find it?

Can automation find it?

Can an authorized AI system resolve it without
guessing?

If any mandatory answer is unknown,

knowledge asset readiness remains incomplete.

# =============================================================================

#

# 191. INSTITUTIONAL DOCUMENT AND KNOWLEDGE ASSET

# REGISTRY DECLARATION

#

# =============================================================================

COREI shall maintain a governed institutional
registry of documents and knowledge assets.

Every material knowledge asset SHALL have

identity,

domain,

authority,

ownership,

version,

status,

and lifecycle

appropriate to its institutional significance.

Current authority SHALL remain distinguishable from

history,

research,

drafts,

copies,

exports,

and stale continuity artifacts.

Document IDs SHALL not be reused.

Domain codes SHALL not be reassigned.

Supersession SHALL remain explicit.

Repository location SHALL remain discoverable.

Dependencies SHALL remain traceable.

Critical institutional knowledge SHALL not exist
only in

chat history,

human memory,

or unregistered files.

The objective is not merely document storage.

The objective is controlled institutional knowledge
continuity.

# =============================================================================

#

# 192. CONSTITUTIONAL COMMITMENT

#

# =============================================================================

COREI institutional knowledge assets

shall remain

identified,

registered,

classified,

authority-aware,

owner-controlled,

versioned,

status-aware,

domain-aligned,

repository-linked,

dependency-aware,

supersession-aware,

baseline-aware,

freshness-aware,

history-preserving,

research-distinguishing,

implementation-grounded,

runtime-aware,

searchable,

discoverable,

cross-referenced,

traceable,

validatable,

AI-resolvable,

continuity-preserving,

and institutionally governed.

Knowledge shall remain understandable across

documents,

repositories,

Stages,

Phases,

Steps,

Subsystems,

Artifacts,

platforms,

services,

modules,

engines,

domains,

applications,

workspaces,

infrastructure,

operations,

trading systems,

automation systems,

artificial intelligence systems,

teams,

roles,

environments,

releases,

migrations,

incidents,

decisions,

and generations of technology.

# =============================================================================

#

# 193. AUTHORITY

#

# =============================================================================

This document defines the authoritative
Institutional Document and Knowledge Asset Registry
of COREI.

Every material

constitutional document,

identity document,

governance document,

architecture document,

engineering document,

standard,

specification,

operations document,

implementation document,

reference document,

history document,

research document,

continuity document,

blueprint,

execution model,

Stage document,

Phase document,

Step document,

Subsystem document,

Artifact document,

runbook,

playbook,

procedure,

manual,

guide,

index,

registry,

catalog,

dictionary,

glossary,

decision record,

change record,

incident record,

validation record,

certification record,

migration record,

release record,

analysis report,

research note,

and future institutional knowledge asset

shall comply with this document.

Document-type-specific and knowledge-domain-specific
documents MAY extend this registry.

No extension may weaken constitutional,
governance,
architectural,
engineering,
standards,
specification,
operations,
implementation,
reference,
identity,
authority,
ownership,
versioning,
status,
dependency,
supersession,
repository,
history,
research,
continuity,
validation,
traceability,
or institutional knowledge requirements.

Changes to this document require constitutional
review.

# =============================================================================

#

# END OF DOCUMENT

#

# DOCUMENT ID

#

# COREI-RF-09.02

#

# DOCUMENT NAME

#

# INSTITUTIONAL DOCUMENT AND KNOWLEDGE ASSET REGISTRY

#

# REPOSITORY FILE

#

# knowledge/09-reference/COREI-RF-09.02-INSTITUTIONAL-DOCUMENT-AND-KNOWLEDGE-ASSET-REGISTRY.md

#

# =============================================================================
